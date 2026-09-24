const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('aerial-survey.js', 'utf8');

function harness({ width = 1440, height = 1000, top = 760, reduced = false, observer = true, canvasAvailable = true } = {}) {
  const classes = new Set();
  const windowEvents = {}, documentEvents = {}, canvasEvents = {};
  const frames = new Map(), observers = [];
  let frameId = 0, created = 0, failDrawing = false, time = 0;
  const mainDraws = [];
  const gradient = { addColorStop() {} };
  function makeContext(main = false) {
    const stack = [];
    return {
      globalAlpha: 1,
      setTransform() {}, createLinearGradient: () => gradient, createRadialGradient: () => gradient,
      fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, arc() {}, stroke() {}, fill() {},
      translate() {}, rotate() {}, putImageData() {},
      createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
      save() { stack.push(this.globalAlpha); }, restore() { this.globalAlpha = stack.pop(); },
      drawImage(image, ...position) {
        if (main && failDrawing) throw new Error('Canvas unavailable');
        if (main) mainDraws.push({ image, alpha: this.globalAlpha, position });
      }
    };
  }
  const canvas = { width: 0, height: 0, ctx: makeContext(true), getContext() { return canvasAvailable ? this.ctx : null; }, addEventListener: (type, fn) => { canvasEvents[type] = fn; } };
  const playback = { hidden: true, textContent: 'Pause clouds', addEventListener(type, fn) { this[type] = fn; } };
  const rect = { top };
  const root = {
    clientWidth: width, clientHeight: height,
    querySelector: selector => selector === '[data-survey-playback]' ? playback : canvas,
    getBoundingClientRect: () => ({ top: rect.top, bottom: rect.top + root.clientHeight }),
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) }
  };
  const motion = { matches: reduced, addEventListener(type, fn) { this.change = fn; } };
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe() {}
  }
  const document = {
    hidden: false, querySelector: () => root,
    addEventListener: (type, fn) => { documentEvents[type] = fn; },
    createElement() { created++; return { width: 0, height: 0, getContext: () => makeContext() }; }
  };
  const window = {
    innerHeight: 900, devicePixelRatio: 2, matchMedia: () => motion,
    requestAnimationFrame(fn) { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    addEventListener: (type, fn) => { windowEvents[type] = fn; }
  };
  if (observer) window.IntersectionObserver = Observer;
  vm.runInNewContext(source, { window, document, IntersectionObserver: Observer });
  function tick(milliseconds = 16) { time += milliseconds; const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(time)); }
  function enter() { if (observer) observers[0].callback([{ isIntersecting: true }]); else windowEvents.scroll?.(); tick(); }
  function advance(milliseconds) {
    mainDraws.length = 0; tick(milliseconds);
  }
  function scroll(top) { rect.top = top; windowEvents.scroll?.(); }
  return { root, rect, canvas, playback, classes, motion, windowEvents, documentEvents, canvasEvents, window, document, frames, observers, mainDraws, tick, enter, advance, scroll, created: () => created, fail: () => { failDrawing = true; } };
}

test('clouds keep flowing after the timed terrain reveal, without scrolling or rebuilding textures', () => {
  const h = harness();
  assert.equal(h.created(), 0, 'offscreen textures are not allocated');
  assert.equal(h.frames.size, 0);
  h.enter();
  const start = h.mainDraws.map(draw => draw.alpha);
  assert.equal(h.frames.size, 1, 'entry schedules the next animation frame');
  h.advance(2400);
  const middle = h.mainDraws.map(draw => draw.alpha);
  assert(start[1] < middle[1], 'terrain emerges without a scroll event');
  assert(start[3] > middle[3], 'clouds clear on the animation clock');
  h.advance(2400);
  const end = h.mainDraws.map(draw => draw.alpha);
  assert(middle[1] < end[1]);
  assert(start[2] < end[2], 'asset connections emerge');
  assert(start[3] > end[3], 'clouds clear');
  assert.equal(h.frames.size, 1, 'ambient cloud movement continues after the reveal');
  const position = h.mainDraws[3].position;
  h.advance(3000);
  assert.deepEqual(h.mainDraws.map(draw => draw.alpha), end, 'terrain reveal stays complete');
  assert.notDeepEqual(h.mainDraws[3].position, position, 'clouds still move without scroll');
  assert(h.mainDraws[3].alpha > .3, 'remaining clouds are visible after the reveal');
  assert.equal(h.created(), 4, 'frames reuse cached layers and cloud texture');
  assert(h.classes.has('aerial-survey--ready'));
});

test('scroll direction and distance do not scrub the reveal; completed reveals do not replay on re-entry', () => {
  const a = harness(), b = harness(); a.enter(); b.enter();
  a.scroll(-900); b.scroll(790); a.advance(1200); b.advance(1200);
  assert.deepEqual(a.mainDraws.map(draw => draw.alpha), b.mainDraws.map(draw => draw.alpha));
  a.scroll(700); a.advance(3600); assert.equal(a.frames.size, 1);
  a.observers[0].callback([{ isIntersecting: false }]);
  a.mainDraws.length = 0; a.enter();
  assert.equal(a.mainDraws.length, 0, 'returning to a settled scene does not restart it');
  assert.equal(a.frames.size, 1, 'ambient drift resumes without replaying the reveal');
});

test('reduced motion stays static and enabling it during a reveal cancels all further movement', () => {
  const h = harness({ reduced: true }); h.enter();
  assert(!h.playback.hidden, 'reduced-motion visitors can choose to play');
  assert.equal(h.playback.textContent, 'Play clouds');
  assert.equal(h.frames.size, 0); h.scroll(200); h.advance(3000); assert.equal(h.mainDraws.length, 0);
  const moving = harness(); moving.enter(); moving.advance(1200);
  moving.motion.matches = true; moving.motion.change(); assert.equal(moving.frames.size, 1); moving.tick();
  assert.equal(moving.frames.size, 0); const settled = moving.mainDraws.slice(-7).map(draw => draw.alpha);
  moving.motion.matches = false; moving.motion.change(); moving.mainDraws.length = 0; moving.tick();
  assert.deepEqual(moving.mainDraws.map(draw => draw.alpha), settled);
  assert.equal(moving.frames.size, 1, 'turning motion back on resumes ambient drift');
  assert(!moving.playback.hidden);
});

test('desktop, tablet and tall phone canvases stay within the pixel budget and resize without new cloud textures', () => {
  const h = harness(); h.enter();
  for (const [width, height] of [[1920, 1100], [768, 1400], [390, 2300], [320, 2800]]) {
    h.root.clientWidth = width; h.root.clientHeight = height;
    h.windowEvents.resize(); h.tick();
    assert(h.canvas.width * h.canvas.height < 1803000);
    assert(Math.abs(h.canvas.width / h.canvas.height - width / height) < .003);
    assert(h.classes.has('aerial-survey--ready'));
  }
  assert.equal(h.created(), 16, 'cloud texture is retained through four resizes');
});

test('offscreen, hidden and page-exit time does not advance the reveal; resume preserves progress', () => {
  const h = harness(); h.enter();
  h.advance(1200); const partial = h.mainDraws.map(draw => draw.alpha);
  h.observers[0].callback([{ isIntersecting: false }]); assert.equal(h.frames.size, 0);
  h.advance(30000); h.enter(); assert.equal(h.mainDraws.length, 0, 'offscreen time is not consumed');
  for (const [hide, show] of [
    [() => { h.document.hidden = true; h.documentEvents.visibilitychange(); }, () => { h.document.hidden = false; h.documentEvents.visibilitychange(); }],
    [() => h.windowEvents.pagehide(), () => h.windowEvents.pageshow()]
  ]) {
    hide(); assert.equal(h.frames.size, 0); h.advance(30000); show(); h.tick();
    assert.equal(h.mainDraws.length, 0, 'hidden/page-exit time is not consumed');
    assert.equal(h.frames.size, 1);
  }
  h.advance(1200); assert(h.mainDraws[1].alpha > partial[1]);
  assert(h.mainDraws[1].alpha < .9, 'resume continues rather than jumping to the end');
});

test('missing canvas or draw failures retain the CSS fallback; restored contexts can recover', () => {
  const absent = harness({ canvasAvailable: false }); assert.equal(absent.frames.size, 0); assert.equal(absent.classes.size, 0);
  const failed = harness(); failed.fail(); failed.enter(); assert.equal(failed.classes.size, 0);
  failed.scroll(200); assert.equal(failed.frames.size, 0);
  const h = harness(); h.enter();
  let prevented = false; h.canvasEvents.contextlost({ preventDefault() { prevented = true; } });
  assert(prevented); assert(!h.classes.has('aerial-survey--ready'));
  h.canvasEvents.contextrestored(); h.tick(); assert(h.classes.has('aerial-survey--ready'));
});

test('without IntersectionObserver, scrolling into view also renders a reduced-motion static scene', () => {
  const h = harness({ observer: false, reduced: true, top: 2000 });
  assert.equal(h.frames.size, 0); h.rect.top = 300; h.enter();
  assert(h.classes.has('aerial-survey--ready'));
  h.scroll(2000); assert.equal(h.frames.size, 0);
});

test('without IntersectionObserver the entrance reveal still runs independently of scroll', () => {
  const h = harness({ observer: false, top: 2000 });
  assert.equal(h.frames.size, 0); h.scroll(900); assert.equal(h.frames.size, 0);
  h.scroll(600); h.tick(); assert.equal(h.frames.size, 1);
  h.advance(1200); const partial = h.mainDraws.map(draw => draw.alpha);
  h.scroll(2000); assert.equal(h.frames.size, 0); h.advance(30000);
  h.scroll(600); h.tick(); assert.equal(h.mainDraws.length, 0);
  h.advance(1200); assert(h.mainDraws[1].alpha > partial[1]);
});

test('pause freezes clouds, survives leaving the section and resizing, and resumes without a time jump', () => {
  const h = harness(); h.enter(); h.advance(5000);
  const position = h.mainDraws[3].position;
  assert.equal(h.playback.textContent, 'Pause clouds'); assert(!h.playback.hidden);
  h.playback.click(); h.tick();
  assert.equal(h.playback.textContent, 'Resume clouds'); assert.equal(h.frames.size, 0);
  h.advance(30000); assert.equal(h.mainDraws.length, 0);
  h.root.clientWidth = 768; h.windowEvents.resize(); h.tick();
  assert.equal(h.frames.size, 0, 'paused scene can resize without restarting');
  h.root.clientWidth = 1440; h.windowEvents.resize(); h.advance(10000);
  assert.deepEqual(h.mainDraws[3].position, position, 'paused time does not advance the cloud layers');
  h.observers[0].callback([{ isIntersecting: false }]); h.enter(); assert.equal(h.frames.size, 0);
  h.playback.click(); h.advance(30000);
  assert.equal(h.playback.textContent, 'Pause clouds'); assert.equal(h.frames.size, 1);
  assert.equal(h.mainDraws.length, 0, 'resume has no hidden-time jump');
  h.advance(1000); assert.notDeepEqual(h.mainDraws[3].position, position);
});

test('cloud painting is throttled on high-refresh displays and user pause survives reduced-motion toggles', () => {
  const h = harness(); h.enter(); h.advance(5000);
  let painted = 0;
  for (let i = 0; i < 120; i++) { h.advance(1000 / 120); if (h.mainDraws.length) painted++; }
  assert(painted >= 25 && painted <= 32, 'roughly 30 paints per second');
  h.playback.click(); h.tick();
  h.motion.matches = true; h.motion.change(); h.tick(); assert(!h.playback.hidden);
  h.motion.matches = false; h.motion.change(); h.tick();
  assert.equal(h.playback.textContent, 'Resume clouds'); assert(!h.playback.hidden); assert.equal(h.frames.size, 0);
});

test('reduced motion is static by default but the visitor can explicitly play and pause the clouds', () => {
  const h = harness({ reduced: true }); h.enter();
  assert.equal(h.frames.size, 0);
  assert.equal(h.playback.textContent, 'Play clouds');
  assert.match(h.playback.title, /reduced-motion/);
  const start = h.mainDraws[3].position;
  h.playback.click(); h.tick(); h.advance(1000);
  assert.equal(h.playback.textContent, 'Pause clouds');
  assert.equal(h.frames.size, 1);
  assert.notDeepEqual(h.mainDraws[3].position, start);
  h.playback.click(); h.tick(); h.advance(1000);
  assert.equal(h.playback.textContent, 'Resume clouds');
  assert.equal(h.frames.size, 0);
  assert.equal(h.mainDraws.length, 0);
  h.playback.click(); h.tick();
  h.motion.change(); h.tick();
  assert.equal(h.frames.size, 0, 'a new motion preference cancels the explicit opt-in');
});

test('cloud flow has no stationary turning points and both bands cover the viewport across complete loops', () => {
  const h = harness(); h.enter(); h.advance(5000);
  const tileWidth = h.root.clientWidth * 1.1;
  let previous = h.mainDraws[3].position[0];
  for (let second = 0; second < 85; second++) {
    h.advance(1000);
    const current = h.mainDraws[3].position[0];
    const distance = (previous - current + tileWidth) % tileWidth;
    assert(Math.abs(distance - tileWidth / 42) < .001, 'constant motion, including loop boundaries');
    assert(distance > h.root.clientWidth * .02, 'movement remains visible every second');
    for (const index of [3, 5]) {
      const first = h.mainDraws[index].position;
      const second = h.mainDraws[index + 1].position;
      assert(first[0] <= 0 && first[0] + first[2] >= 0);
      assert.equal(first[0] + first[2], second[0], 'tiles meet without a gap');
      assert(second[0] + second[2] >= h.root.clientWidth);
    }
    previous = current;
  }
  assert.equal(h.created(), 4, 'long-running movement reuses all textures');
});
