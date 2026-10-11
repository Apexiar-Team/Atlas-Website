const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readFileSync(path.join(__dirname, '../products/amis-customer.js'), 'utf8');
const start = script.indexOf('  const reportDurations =');
const end = script.indexOf('  const dialog =');
assert.ok(start >= 0 && end > start);
const source = script.slice(start, end);

function harness({ reduced = false, observer = true } = {}) {
  const elements = new Map();
  const frames = new Map();
  const windowEvents = new Map();
  const documentEvents = new Map();
  let clock = 0;
  let nextFrame = 0;
  let intersection;
  const element = selector => {
    if (!elements.has(selector)) {
      const attributes = new Map();
      elements.set(selector, {
        dataset: {}, events: new Map(), value: '', textContent: '', hidden: false, disabled: false,
        scrollTop: 0, scrollHeight: 1100, clientHeight: 500, offsetTop: 0,
        classList: { toggle() {} },
        setAttribute: (name, value) => attributes.set(name, value),
        removeAttribute: name => attributes.delete(name),
        getAttribute: name => attributes.get(name),
        addEventListener(name, handler) { this.events.set(name, handler); },
        querySelector: child => element(selector + ' ' + child)
      });
    }
    return elements.get(selector);
  };
  const steps = Array.from({ length: 5 }, (_, index) => {
    const step = element('step-' + index);
    step.dataset.reportStep = String(index);
    step.querySelector('strong').textContent = 'Report stage ' + (index + 1);
    return step;
  });
  const groups = Array.from({ length: 4 }, (_, index) => {
    const group = element('group-' + index);
    group.offsetTop = 100 + index * 220;
    return group;
  });
  const demo = element('demo');
  demo.querySelector = element;
  demo.querySelectorAll = selector => selector === '[data-report-step]' ? steps : groups;
  const window = {
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: identifier => frames.delete(identifier),
    addEventListener: (name, handler) => windowEvents.set(name, handler)
  };
  class Observer {
    constructor(callback) { intersection = callback; }
    observe() {}
  }
  if (observer) window.IntersectionObserver = Observer;
  const document = { hidden: false, addEventListener: (name, handler) => documentEvents.set(name, handler) };
  const context = { root: { querySelector: () => demo }, window, document, motion: { matches: reduced }, paused: false, syncPhoneMotion: undefined, IntersectionObserver: Observer };
  const helpers = vm.runInNewContext(source + '\n;({ getReportFrame, reportLength, reportDescription, reportStarts });', context);
  return {
    ...helpers, element, demo, context,
    frames: () => frames.size,
    stage: () => Number(demo.dataset.stage),
    playing: () => demo.dataset.playing === 'true',
    value: name => element('#demo-' + name).value,
    step: index => steps[index].events.get('click')(),
    click: selector => element(selector).events.get('click')(),
    visible: visible => intersection?.([{ isIntersecting: visible, intersectionRatio: visible ? .75 : 0 }]),
    hidden: hidden => { document.hidden = hidden; documentEvents.get('visibilitychange')(); },
    page: name => windowEvents.get(name)(),
    advance: duration => {
      for (let elapsed = 0; elapsed < duration; elapsed += 40) {
        clock += 40;
        const callbacks = [...frames.values()];
        frames.clear();
        callbacks.forEach(callback => callback(clock));
      }
    }
  };
}

test('report timeline clamps its bounds and populates only reached fields', () => {
  const state = harness();
  assert.equal(state.getReportFrame(-100).stage, 0);
  assert.equal(state.getReportFrame(NaN).values.incident, '');
  assert.equal(state.getReportFrame(state.reportStarts[1], true).values.station, 'Blackheath (BLH)');
  assert.equal(state.getReportFrame(state.reportStarts[1], true).values.description, '');
  const final = state.getReportFrame(state.reportLength + 100);
  assert.equal(final.stage, 4);
  assert.equal(final.progress, 1);
  assert.equal(final.review, true);
  assert.equal(final.values.event, 'Example event');
});

test('description types progressively and reaches the full example without overshooting', () => {
  const state = harness();
  const beginning = state.reportStarts[2];
  assert.equal(state.getReportFrame(beginning).values.description, '');
  const middle = state.getReportFrame(beginning + 2500).values.description;
  assert.ok(middle.length > 0 && middle.length < state.reportDescription.length);
  assert.ok(state.reportDescription.startsWith(middle));
  assert.equal(state.getReportFrame(state.reportStarts[3]).values.description, state.reportDescription);
});

test('manual steps are settled, announced and do not start animation', () => {
  const state = harness();
  state.step(2);
  assert.equal(state.stage(), 2);
  assert.equal(state.value('description'), state.reportDescription);
  assert.equal(state.playing(), false);
  assert.equal(state.frames(), 0);
  assert.match(state.element('[data-report-announcement]').textContent, /Step 3 of 5/);
  state.click('[data-report-next]');
  assert.equal(state.stage(), 3);
  state.click('[data-report-previous]');
  assert.equal(state.stage(), 2);
  state.click('[data-report-review-button]');
  assert.equal(state.element('[data-report-review]').hidden, false);
  assert.equal(state.element('[data-report-fields]').hidden, true);
  assert.equal(state.element('[data-report-next]').disabled, true);
  assert.equal(state.element('[data-report-progress]').value, 1);
});

test('autoplay starts on visibility, finishes once and does not restart on re-entry', () => {
  const state = harness();
  assert.equal(state.playing(), false);
  state.visible(true);
  assert.equal(state.playing(), true);
  state.advance(state.reportLength + 200);
  assert.equal(state.stage(), 4);
  assert.equal(state.playing(), false);
  assert.equal(state.element('[data-report-progress]').value, 1);
  state.visible(false);
  state.visible(true);
  assert.equal(state.frames(), 0);
});

test('pause freezes typing and replay resets the sequence', () => {
  const state = harness();
  state.visible(true);
  state.advance(9500);
  const description = state.value('description');
  state.click('[data-report-play]');
  state.advance(5000);
  assert.equal(state.value('description'), description);
  assert.equal(state.frames(), 0);
  state.click('[data-report-replay]');
  assert.equal(state.stage(), 0);
  assert.equal(state.value('description'), '');
  assert.equal(state.playing(), true);
});

test('offscreen, hidden and page-exit time do not advance the report', () => {
  const state = harness();
  state.visible(true);
  state.advance(1500);
  const progress = state.element('[data-report-progress]').value;
  state.visible(false);
  state.advance(5000);
  assert.equal(state.frames(), 0);
  assert.equal(state.element('[data-report-progress]').value, progress);
  state.visible(true);
  state.hidden(true);
  state.advance(5000);
  assert.equal(state.frames(), 0);
  state.hidden(false);
  state.page('pagehide');
  state.advance(5000);
  assert.equal(state.frames(), 0);
  state.page('pageshow');
  state.advance(500);
  assert.ok(state.element('[data-report-progress]').value > progress);
  assert.ok(state.element('[data-report-progress]').value < .15);
});

test('reduced motion starts static and explicit playback uses settled steps', () => {
  const state = harness({ reduced: true });
  state.visible(true);
  assert.equal(state.frames(), 0);
  assert.equal(state.value('incident'), 'Abusive Customer');
  state.step(2);
  state.click('[data-report-play]');
  state.advance(100);
  assert.equal(state.value('description'), state.reportDescription);
  state.context.syncPhoneMotion();
  assert.equal(state.frames(), 0);
});

test('page-wide pause and direct phone interaction stop playback', () => {
  const state = harness();
  state.visible(true);
  state.context.paused = true;
  state.context.syncPhoneMotion();
  assert.equal(state.frames(), 0);
  assert.equal(state.element('[data-report-play]').disabled, true);
  state.context.paused = false;
  state.context.syncPhoneMotion();
  state.click('[data-report-play]');
  assert.equal(state.playing(), true);
  state.element('[data-report-scroll]').events.get('wheel')();
  assert.equal(state.frames(), 0);
  assert.equal(state.playing(), false);
});

test('missing IntersectionObserver retains manual steps and explicit playback', () => {
  const state = harness({ observer: false });
  assert.equal(state.playing(), false);
  state.step(1);
  assert.equal(state.value('station'), 'Blackheath (BLH)');
  state.click('[data-report-play]');
  state.advance(5000);
  assert.equal(state.stage(), 2);
});