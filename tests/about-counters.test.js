const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
const source = script.slice(script.indexOf('  const aboutStatsSection ='), script.indexOf('  // --- Globe constellation dots ---'));

function harness({ reduced = false, observer = true } = {}) {
  const elements = [
    { dataset: { counterEnd: '242', counterSuffix: '+' }, textContent: '242+' },
    { dataset: { counterEnd: '4', counterSuffix: '+' }, textContent: '4+' },
    { dataset: { counterEnd: '99.9', counterDecimals: '1', counterSuffix: '%' }, textContent: '99.9%' }
  ];
  const section = { querySelectorAll: () => elements };
  let observeCallback, frame, motionCallback;
  const window = {
    requestAnimationFrame: cb => { frame = cb; return 1; },
    cancelAnimationFrame: () => { frame = null; },
    matchMedia: () => ({ addEventListener: (name, cb) => { motionCallback = cb; } })
  };
  class Observer {
    constructor(cb) { observeCallback = cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  if (observer) window.IntersectionObserver = Observer;
  vm.runInNewContext(source, {
    window, document: { querySelector: () => section }, performance: { now: () => 0 },
    reducedMotion: reduced, IntersectionObserver: Observer
  });
  return {
    values: () => elements.map(element => element.textContent),
    enter: () => observeCallback?.([{ isIntersecting: true, target: section }]),
    tick: time => { const cb = frame; frame = null; cb?.(time); },
    reduce: () => motionCallback?.({ matches: true }),
    pending: () => !!frame
  };
}

test('all counters advance at different rates and reach their targets on the same frame only once', () => {
  const h = harness();
  assert.deepEqual(h.values(), ['242+', '4+', '99.9%']);
  h.enter(); assert.deepEqual(h.values(), ['0+', '0+', '0.0%']);
  h.tick(1000); assert.deepEqual(h.values(), ['121+', '2+', '49.9%']);
  h.tick(1999); assert.deepEqual(h.values(), ['241+', '3+', '99.8%']);
  h.tick(2000); assert.deepEqual(h.values(), ['242+', '4+', '99.9%']);
  assert(!h.pending());
  h.enter(); assert(!h.pending());
});

test('reduced motion or unavailable observer keeps final values visible', () => {
  for (const options of [{ reduced: true }, { observer: false }]) {
    const h = harness(options); h.enter();
    assert.deepEqual(h.values(), ['242+', '4+', '99.9%']);
    assert(!h.pending());
  }
});

test('enabling reduced motion during counting restores every final value immediately', () => {
  const h = harness(); h.enter(); h.tick(500); h.reduce();
  assert.deepEqual(h.values(), ['242+', '4+', '99.9%']);
  assert(!h.pending());
});
