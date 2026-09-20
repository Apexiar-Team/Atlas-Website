const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../thermal-comparison.js'), 'utf8');

function harness({ width = 1320, cached = false, decode = () => Promise.resolve() } = {}) {
  class Element {
    constructor() {
      this.handlers = {}; this.attrs = {}; this.values = {}; this.classes = new Set();
      this.classList = { add: k => this.classes.add(k), remove: k => this.classes.delete(k), toggle: (k, yes) => yes ? this.classes.add(k) : this.classes.delete(k) };
      this.style = { setProperty: (k, v) => this.values[k] = v };
      this.width = width; this.value = '40'; this.disabled = true; this.offsetWidth = 76;
      this.complete = false; this.naturalWidth = 1672; this.naturalHeight = 941; this.decode = decode;
    }
    addEventListener(name, callback) { (this.handlers[name] ||= []).push(callback); }
    emit(name, event = {}) { (this.handlers[name] || []).forEach(cb => cb(event)); }
    setAttribute(key, value) { this.attrs[key] = value; }
    getBoundingClientRect() { return { left: 24, width: this.width }; }
    focus(options) { this.focused = options; }
    setPointerCapture(id) { this.capture = id; }
    hasPointerCapture(id) { return this.capture === id; }
    releasePointerCapture() { this.capture = null; }
  }
  const comparison = new Element(), frame = new Element(), visible = new Element(), thermal = new Element();
  const range = new Element(), thermalLabel = new Element(), visibleLabel = new Element(), status = new Element();
  const map = { '.thermal-comparison__frame': frame, '.thermal-comparison__visible': visible,
    '.thermal-comparison__thermal': thermal, 'input[type="range"]': range,
    '.thermal-comparison__label--thermal': thermalLabel, '.thermal-comparison__label--visible': visibleLabel,
    '.thermal-comparison__status': status };
  comparison.querySelector = key => map[key];
  visible.complete = thermal.complete = cached;
  const win = new Element();
  vm.runInNewContext(source, { document: { querySelectorAll: () => [comparison] }, window: win });
  const settle = () => new Promise(resolve => setImmediate(resolve));
  const ready = async () => { visible.complete = thermal.complete = true; visible.emit('load'); thermal.emit('load'); await settle(); };
  const value = v => { range.value = String(v); range.emit('input'); };
  const pointer = (name, x, y = 30, type = 'mouse', extra = {}) => frame.emit(name, {
    pointerId: 1, pointerType: type, clientX: x + 24, clientY: y, button: 0, isPrimary: true,
    preventDefault() { this.prevented = true; }, ...extra
  });
  return { comparison, frame, visible, thermal, range, thermalLabel, visibleLabel, status, win, settle, ready, value, pointer };
}

test('waits for both images and decoding before enabling the initial 40% comparison', async () => {
  let release;
  const decoded = new Promise(resolve => release = resolve);
  const h = harness({ decode: () => decoded });
  assert(h.range.disabled); assert(h.thermalLabel.hidden);
  h.visible.emit('load'); await h.settle(); assert(h.range.disabled);
  h.thermal.emit('load'); await h.settle(); assert(h.range.disabled);
  release(); await h.settle();
  assert(!h.range.disabled); assert(h.comparison.classes.has('is-ready'));
  assert.equal(h.comparison.values['--reveal'], '40%');
  assert.equal(h.range.attrs['aria-valuetext'], '40% thermal view, 60% visible-light view');
});

test('range updates and edge labels stay correct across desktop/tablet/phone widths', async () => {
  for (const width of [1320, 688, 350, 280]) {
    const h = harness({ width }); await h.ready();
    h.value(0); assert(h.thermalLabel.hidden); assert(!h.visibleLabel.hidden);
    h.value(100); assert(!h.thermalLabel.hidden); assert(h.visibleLabel.hidden);
    h.value(50); assert(!h.thermalLabel.hidden && !h.visibleLabel.hidden);
    h.frame.width = 180; h.win.emit('resize');
    assert(h.thermalLabel.hidden && h.visibleLabel.hidden, 'hide labels when their view is too narrow');
  }
});

test('mouse dragging reaches both edges and supports dragging outside the frame', async () => {
  const h = harness({ width: 1000 }); await h.ready();
  h.pointer('pointerdown', 690); assert.equal(h.range.value, '69'); assert.equal(h.frame.capture, 1);
  assert(h.range.focused.preventScroll);
  h.pointer('pointermove', 800); assert.equal(h.range.value, '80');
  h.pointer('pointermove', 1200); assert.equal(h.range.value, '100');
  h.pointer('pointerup', -20); assert.equal(h.range.value, '0'); assert.equal(h.frame.capture, null);
});

test('vertical touch gestures leave the value alone; horizontal touch and cancellation work', async () => {
  const h = harness({ width: 350 }); await h.ready();
  h.pointer('pointerdown', 100, 30, 'touch');
  h.pointer('pointermove', 102, 60, 'touch'); h.pointer('pointerup', 103, 80, 'touch');
  assert.equal(h.range.value, '40'); assert(!h.frame.capture);
  h.pointer('pointerdown', 100, 30, 'touch'); h.pointer('pointermove', 270, 32, 'touch');
  assert.equal(h.range.value, '77');
  h.frame.emit('pointercancel'); h.pointer('pointermove', 340, 33, 'touch');
  assert.equal(h.range.value, '77');
});

test('thermal load/decode failure and mismatched dimensions retain the visible fallback', async () => {
  const h = harness(); h.visible.emit('load'); h.thermal.emit('error'); await h.settle();
  assert(h.range.disabled); assert(!h.comparison.classes.has('is-ready'));
  assert(h.thermalLabel.hidden && !h.visibleLabel.hidden);
  assert.match(h.status.textContent, /Showing the visible image/);
  h.pointer('pointerdown', 900); assert.equal(h.range.value, '40');
  const k = harness({ decode: () => Promise.reject(new Error('Decode failed')) });
  await k.ready(); assert(k.range.disabled);
  const m = harness(); m.thermal.naturalWidth = 1600; await m.ready(); assert(m.range.disabled);
});

test('cached images initialise, and a subsequent image failure disables the overlay', async () => {
  const h = harness({ cached: true }); await h.settle();
  assert(!h.range.disabled);
  h.thermal.naturalWidth = 0; h.thermal.emit('error');
  assert(h.range.disabled); assert(!h.comparison.classes.has('is-ready'));
});
