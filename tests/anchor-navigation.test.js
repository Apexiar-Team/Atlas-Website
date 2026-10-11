const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
const start = script.indexOf('  // --- Smooth scroll for anchor links (fallback) ---');
const end = script.indexOf('  // --- Video reel text slide sync ---');
assert.ok(start >= 0 && end > start);
const source = script.slice(start, end);

function harness({ skip = true, reduced = false, tabIndex = null, present = true } = {}) {
  const attributes = new Map(tabIndex === null ? [] : [['tabindex', tabIndex]]);
  const events = [];
  let clickHandler;
  const target = {
    hasAttribute: name => attributes.has(name),
    setAttribute: (name, value) => {
      attributes.set(name, value);
      events.push({ type: 'attribute', name, value });
    },
    focus: options => events.push({ type: 'focus', ...options }),
    scrollIntoView: options => events.push({ type: 'scroll', ...options })
  };
  const anchor = {
    classList: { contains: name => skip && name === 'skip-nav' },
    getAttribute: () => '#main-content',
    addEventListener: (name, handler) => {
      assert.equal(name, 'click');
      clickHandler = handler;
    }
  };
  vm.runInNewContext(source, {
    reducedMotion: reduced,
    document: {
      querySelectorAll: () => [anchor],
      querySelector: selector => {
        assert.equal(selector, '#main-content');
        return present ? target : null;
      }
    }
  });
  return {
    attributes,
    events,
    click: () => clickHandler({ preventDefault: () => events.push({ type: 'preventDefault' }) })
  };
}

test('skip links focus main content before scrolling with normal or reduced motion', () => {
  for (const reduced of [false, true]) {
    const state = harness({ reduced });
    state.click();
    assert.equal(state.attributes.get('tabindex'), '-1');
    assert.deepEqual(state.events, [
      { type: 'preventDefault' },
      { type: 'attribute', name: 'tabindex', value: '-1' },
      { type: 'focus', preventScroll: true },
      { type: 'scroll', behavior: reduced ? 'auto' : 'smooth', block: 'start' }
    ]);
  }
});

test('skip links preserve an existing target tabindex', () => {
  const state = harness({ tabIndex: '0' });
  state.click();
  assert.equal(state.attributes.get('tabindex'), '0');
  assert.equal(state.events.some(event => event.type === 'attribute'), false);
  assert.equal(state.events.filter(event => event.type === 'focus').length, 1);
});

test('ordinary section links retain scrolling without moving focus', () => {
  const state = harness({ skip: false });
  state.click();
  assert.equal(state.attributes.has('tabindex'), false);
  assert.deepEqual(state.events, [
    { type: 'preventDefault' },
    { type: 'scroll', behavior: 'smooth', block: 'start' }
  ]);
});

test('a missing anchor target leaves native navigation untouched', () => {
  const state = harness({ present: false });
  state.click();
  assert.deepEqual(state.events, []);
});