const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../inspection.js'), 'utf8');

function harness({ width = 1440, height = 900, reduced = false, io = true, frameCallback = false } = {}) {
  class Element {
    constructor() {
      this.handlers = {}; this.attrs = {}; this.classes = new Set(); this.values = {};
      this.style = { setProperty: (k, v) => this.values[k] = v, getPropertyValue: k => this.values[k] || '' };
      this.classList = { add: (...ks) => ks.forEach(k => this.classes.add(k)), remove: (...ks) => ks.forEach(k => this.classes.delete(k)) };
      this.clientWidth = width; this.clientHeight = height - 64;
    }
    addEventListener(n, cb, opts) { (this.handlers[n] ||= []).push(cb); opts?.signal?.addEventListener('abort', () => this.handlers[n] = this.handlers[n].filter(x => x !== cb)); }
    emit(n, e = {}) { (this.handlers[n] || []).forEach(cb => cb(e)); }
    getBoundingClientRect() {
      const top = parseFloat(this.style.top) || this.top || 2000, left = parseFloat(this.style.left) || 0;
      const width = parseFloat(this.style.width) || this.clientWidth, height = parseFloat(this.style.height) || 64;
      return { top, left, width, height, right: left + width, bottom: top + height };
    }
    setAttribute(k, v) { this.attrs[k] = v; }
    getAttribute(k) { return this[k] || this.attrs[k]; }
    focus() { this.focused = true; }
    scrollIntoView(o) { this.scrolled = o; }
  }
  const section = new Element(), video = new Element(), stage = new Element(), media = new Element(), intro = new Element();
  intro.offsetHeight = 240;
  const classes = ['target', 'target-label', 'links', 'tag-link path', 'tag-link circle', 'evidence-link path', 'evidence-link circle', 'mode', 'status', 'evidence', 'approach', 'closing', 'finding', 'bottom'];
  const elements = Object.fromEntries(classes.map(k => ['.inspection__' + k, new Element()]));
  elements['.inspection__bottom'].offsetHeight = 100;
  Object.assign(elements, { video, '.inspection__stage': stage, '.inspection__media': media, '.inspection__intro': intro });
  section.querySelector = key => elements[key];
  stage.querySelector = key => elements[key];
  stage.offsetHeight = height - 64;
  section.offsetHeight = intro.offsetHeight + stage.offsetHeight + height * (width <= 900 ? 1.25 : 2);
  const after = new Element(), motion = new Element(), win = new Element(), doc = new Element();
  motion.matches = reduced;
  Object.assign(win, { innerWidth: width, innerHeight: height, matchMedia: () => motion });
  doc.querySelector = key => key === '[data-inspection]' ? section : new Element();
  doc.getElementById = () => after;
  let current = 0, pendingFrame, observed, queue = [], timerId = 0;
  const timers = new Map(), requests = [];
  video.dataset = { src: 'clip.mp4' }; video.duration = 10; video.videoWidth = 1600; video.videoHeight = 902;
  video.load = () => video.loadCalled = true; video.pause = () => video.paused = true;
  Object.defineProperty(video, 'currentTime', { get: () => current, set: value => { assert(!video.seeking, 'must serialise seeks'); requests.push(value); current = value; video.seeking = true; video.emit('seeking'); } });
  if (frameCallback) { video.requestVideoFrameCallback = cb => { pendingFrame = cb; return 1; }; video.cancelVideoFrameCallback = () => pendingFrame = null; }
  class Observer { constructor(cb) { this.cb = cb; observed = this; } observe() {} disconnect() {} }
  if (io) win.IntersectionObserver = Observer;
  const context = { window: win, document: doc, IntersectionObserver: Observer, AbortController,
    requestAnimationFrame: cb => { queue.push(cb); return queue.length; }, cancelAnimationFrame: () => queue = [],
    setTimeout: (cb, delay) => { timers.set(++timerId, { cb, delay }); return timerId; }, clearTimeout: id => timers.delete(id) };
  vm.runInNewContext(source, context);
  const flush = () => { let count = 0; while (queue.length) { assert(count++ < 30, 'must not run an endless frame loop'); const batch = queue; queue = []; batch.forEach(cb => cb()); } };
  const scroll = p => { section.top = 64 - intro.offsetHeight - p * (section.offsetHeight - intro.offsetHeight - stage.offsetHeight); win.emit('scroll'); flush(); };
  const ready = () => { observed.cb([{ isIntersecting: true }]); video.emit('loadedmetadata'); video.emit('loadeddata'); flush(); };
  const finish = () => { video.seeking = false; if (pendingFrame) { const cb = pendingFrame; pendingFrame = null; cb(0, { mediaTime: current }); } video.emit('seeked'); flush(); };
  return { section, intro, video, elements, media, after, win, motion, timers, requests, scroll, ready, finish, flush, observed };
}

test('lazy loading, forward/reverse, hold, clamped last frame and serialized rapid seeks', () => {
  const h = harness(); assert(!h.video.src); h.ready(); assert(h.video.loadCalled);
  h.scroll(.55); assert(h.requests[0] > 5); h.scroll(.2); assert.equal(h.requests.length, 1);
  h.finish(); assert.equal(h.requests.length, 2); assert(h.requests[1] < 2); h.finish();
  const count = h.requests.length; h.flush(); assert.equal(h.requests.length, count);
  h.scroll(1.5); h.finish(); assert(h.video.currentTime < 10 && h.video.currentTime > 9.9);
  h.scroll(-.5); h.finish(); assert.equal(h.video.currentTime, 0);
});

test('overlays follow completed frames, including actual shot cut and reverse', () => {
  for (const frameCallback of [false, true]) {
    const h = harness({ frameCallback }); h.ready(); h.scroll(.9);
    assert.equal(h.elements['.inspection__mode'].textContent, 'Aerial inspection');
    h.finish(); assert.equal(h.elements['.inspection__mode'].textContent, 'Inspection camera');
    assert.equal(h.elements['.inspection__evidence'].attrs['aria-hidden'], 'false');
    h.scroll(.38); h.finish(); assert.equal(h.elements['.inspection__mode'].textContent, 'Aerial inspection');
    assert.equal(h.elements['.inspection__evidence'].attrs['aria-hidden'], 'true');
  }
});

test('contained-video marker remains within rendered image at desktop/tablet/mobile sizes', () => {
  for (const [width, height, mediaHeight] of [[1440,900,836], [768,1024,432], [390,844,220]]) {
    const h = harness({ width, height }); h.media.clientHeight = mediaHeight; h.ready(); h.scroll(.88); h.finish();
    const marker = h.elements['.inspection__target'].style;
    const x = parseFloat(marker.getPropertyValue('left') || h.elements['.inspection__target'].style.left);
    const y = parseFloat(h.elements['.inspection__target'].style.top);
    const w = parseFloat(h.elements['.inspection__target'].style.width), hh = parseFloat(h.elements['.inspection__target'].style.height);
    assert(x >= 0 && x + w <= width); assert(y >= 0 && y + hh <= mediaHeight);
    const scale = Math.min(width / 1600, mediaHeight / 902);
    assert(Math.abs(y - .15 * 902 * scale) < .001, 'marker follows top-aligned footage');
    assert.equal(h.section.values['--inspection-travel'], width <= 900 ? '125svh' : '200svh');
  }
});

test('approved edit changes view at four seconds, then holds its final marker and evidence', () => {
  const h = harness(); h.ready();
  h.scroll(4.01 / (10 - 1 / 24)); h.finish();
  assert.equal(h.elements['.inspection__mode'].textContent, 'Inspection camera');
  h.scroll(7.45 / (10 - 1 / 24)); h.finish();
  assert.equal(h.elements['.inspection__evidence'].attrs['aria-hidden'], 'true');
  h.scroll(8.4 / (10 - 1 / 24)); h.finish();
  assert.equal(h.elements['.inspection__evidence'].attrs['aria-hidden'], 'false');
  assert.equal(h.elements['.inspection__closing'].attrs['aria-hidden'], 'false');
  assert(h.section.classes.has('is-closing'));
  const box = () => ['left','top','width','height'].map(k => h.elements['.inspection__target'].style[k]);
  const held = box(); h.scroll(.999); h.finish(); assert.deepEqual(box(), held);
  h.scroll(.45); h.finish(); assert.notDeepEqual(box(), held);
  assert(!h.section.classes.has('is-closing'));
  assert.equal(h.elements['.inspection__evidence'].attrs['aria-hidden'], 'true');
});

test('reduced motion, small landscape and missing observer do not load or pin', () => {
  for (const opts of [{ reduced: true }, { height: 400 }, { io: false }]) {
    const h = harness(opts); h.win.emit('resize'); h.flush();
    assert(!h.section.classes.has('is-interactive')); assert(!h.video.src);
  }
  const h = harness(); h.ready(); h.motion.matches = true; h.motion.emit('change');
  assert(!h.section.classes.has('is-interactive')); assert(h.video.paused);
});

test('slow loading and errors fall back without trapping scrolling', () => {
  const h = harness(); h.observed.cb([{ isIntersecting: true }]);
  [...h.timers.values()].find(t => t.delay === 25000).cb();
  assert(!h.section.classes.has('is-interactive')); h.win.emit('resize'); assert(!h.section.classes.has('is-interactive'));
  const k = harness(); k.ready(); k.video.emit('error'); assert(!k.section.classes.has('is-interactive'));
});

test('footage stays on its first frame while the introduction scrolls away', () => {
  const h = harness(); h.ready();
  h.section.top = 64;
  h.win.emit('scroll'); h.flush();
  assert.equal(h.video.currentTime, 0);
  h.section.top = 64 - h.intro.offsetHeight / 2;
  h.win.emit('scroll'); h.flush();
  assert.equal(h.video.currentTime, 0);
  h.scroll(.5); h.finish();
  assert(h.video.currentTime > 4.9 && h.video.currentTime < 5);
});

test('desktop stage fits video and caption on tall screens and remains viewport-capped', () => {
  for (const height of [900, 1800]) {
    const h = harness({ width: 1440, height }); h.ready();
    assert.equal(parseFloat(h.section.values['--inspection-stage-height']), Math.min(height - 64, 1440 * 902 / 1600 + 100));
    assert.equal(h.section.values['--inspection-footer-height'], '100px');
    h.elements['.inspection__bottom'].offsetHeight = 80;
    h.win.emit('resize');
    assert.equal(parseFloat(h.section.values['--inspection-stage-height']), Math.min(height - 64, 1440 * 902 / 1600 + 80));
  }
});

test('page exit cleans up listeners, observers and timers', () => {
  const h = harness(); h.ready(); h.scroll(.5); h.win.emit('pagehide', { persisted: false });
  assert.equal(h.timers.size, 0); assert.equal(h.win.handlers.scroll.length, 0);
});
