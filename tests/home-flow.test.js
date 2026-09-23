const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('script.js', 'utf8').replace(/\r\n/g, '\n');
const start = source.indexOf('  const animateHomepage = () => {');
const end = source.indexOf('\n\n  const animateElements = () => {', start);
assert(start >= 0 && end > start, 'homepage animation function must remain discoverable');
const animateHomepageSource = source.slice(start, end);

function harness({ reduced = false, intersectionObserver = true } = {}) {
  const classes = new Set();
  const flow = {
    classList: {
      add: (...names) => names.forEach(name => classes.add(name)),
      remove: (...names) => names.forEach(name => classes.delete(name))
    }
  };
  const motion = {
    matches: reduced,
    listener: null,
    addEventListener(type, listener) { if (type === 'change') this.listener = listener; }
  };
  const observers = [];
  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.observed = [];
      this.unobserved = [];
      this.disconnected = false;
      observers.push(this);
    }
    observe(target) { this.observed.push(target); }
    unobserve(target) { this.unobserved.push(target); }
    disconnect() { this.disconnected = true; }
  }
  const window = { matchMedia: () => motion };
  if (intersectionObserver) window.IntersectionObserver = Observer;
  const document = {
    querySelector: selector => selector === '.home-flow' ? flow : null,
    querySelectorAll: () => []
  };
  vm.runInNewContext(`${animateHomepageSource}\nanimateHomepage();`, {
    window,
    document,
    IntersectionObserver: intersectionObserver ? Observer : undefined
  });
  return { classes, flow, motion, observers };
}

test('prepares once and starts the timeline pulse when the flow enters view', () => {
  const h = harness();
  assert(h.classes.has('home-flow--pulse-ready'));
  assert(!h.classes.has('home-flow--pulse-active'));
  assert.equal(h.observers.length, 2);
  assert.equal(h.observers[0].options.threshold, 0.2);
  assert.equal(h.observers[0].options.rootMargin, '0px 0px -12% 0px');
  assert.deepEqual(h.observers[0].observed, [h.flow]);

  h.observers[0].callback([{ target: h.flow, isIntersecting: false }]);
  assert(!h.classes.has('home-flow--pulse-active'));
  h.observers[0].callback([{ target: h.flow, isIntersecting: true }]);
  assert(h.classes.has('home-flow--pulse-active'));
  assert.deepEqual(h.observers[0].unobserved, [h.flow]);
});

test('reduced motion and missing IntersectionObserver retain the static timeline', () => {
  for (const options of [{ reduced: true }, { intersectionObserver: false }]) {
    const h = harness(options);
    assert(!h.classes.has('home-flow--pulse-ready'));
    assert(!h.classes.has('home-flow--pulse-active'));
    assert.equal(h.observers.length, 0);
  }
});

test('a live reduced-motion change cancels observers and restores static classes', () => {
  const h = harness();
  h.observers[0].callback([{ target: h.flow, isIntersecting: true }]);
  h.motion.listener({ matches: true });
  assert(!h.classes.has('home-flow--pulse-ready'));
  assert(!h.classes.has('home-flow--pulse-active'));
  assert(h.observers.every(observer => observer.disconnected));
});
