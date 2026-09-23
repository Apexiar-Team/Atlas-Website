/* Native, paused-video scroll scrubbing. No playback, scroll interception or dependencies. */
(() => {
  'use strict';
  const section = document.querySelector('[data-inspection]');
  if (!section) return;

  // Seconds in the supplied 24 fps clip. Edit copy in index.html.
  const INSPECTION_CONFIG = {
    fps: 24,
    scrollScreens: { desktop: 2, mobile: 1.25 },
    mobileBreakpoint: 900,
    minimumHeight: 520,
    loadingTimeout: 25000,
    timeline: { approachOut: 3.65, cut: 4, target: 4.1, capture: 7.5, finding: 8, fade: .35 },
    // Manually inspected source-frame rectangles: [seconds, left, top, width, height].
    // Normalised against the approved 1600 x 902 edit, including its tighter crop.
    // Repeated entries preserve each pause and the final 7.5-10s hold.
    damageKeyframes: [
      [4, .478, .390, .122, .218],
      [4.25, .478, .390, .122, .218],
      [4.75, .460, .360, .160, .275],
      [5.25, .436, .316, .204, .352],
      [5.666667, .430, .306, .216, .362],
      [6, .430, .306, .216, .362],
      [6.5, .397, .263, .278, .475],
      [7, .367, .205, .351, .596],
      [7.25, .348, .170, .407, .701],
      [7.5, .345, .150, .430, .740],
      [9.958333, .345, .150, .430, .740]
    ]
  };
  const video = section.querySelector('video');
  const stage = section.querySelector('.inspection__stage');
  const intro = section.querySelector('.inspection__intro');
  const bottom = section.querySelector('.inspection__bottom');
  const media = section.querySelector('.inspection__media');
  const marker = section.querySelector('.inspection__target');
  const tag = section.querySelector('.inspection__target-label');
  const links = section.querySelector('.inspection__links');
  const tagPath = section.querySelector('.inspection__tag-link path');
  const tagPoint = section.querySelector('.inspection__tag-link circle');
  const evidencePath = section.querySelector('.inspection__evidence-link path');
  const evidencePoint = section.querySelector('.inspection__evidence-link circle');
  const mode = stage.querySelector('.inspection__mode');
  const status = section.querySelector('.inspection__status');
  const evidence = section.querySelector('.inspection__evidence');
  const approach = section.querySelector('.inspection__approach');
  const closing = section.querySelector('.inspection__closing');
  const finding = section.querySelector('.inspection__finding');
  const nav = document.querySelector('.navbar');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: events.signal });
  const clamp = value => Math.max(0, Math.min(1, value));
  const fade = (time, start) => clamp((time - start) / INSPECTION_CONFIG.timeline.fade);
  let active = false, loaded = false, failed = false, busy = false, seekingStarted = false;
  let raf = 0, frameRequest = null, seekGeneration = 0, watchdog = 0, loadTimer = 0;
  let duration = 0, displayedTime = 0, desiredTime = 0, observer;
  let bounds = { width: 0, height: 0, left: 0, top: 0 };

  function damageAt(time) {
    const frames = INSPECTION_CONFIG.damageKeyframes;
    if (time <= frames[0][0]) return frames[0].slice(1);
    for (let i = 1; i < frames.length; i++) {
      if (time <= frames[i][0]) {
        const a = frames[i - 1], b = frames[i], p = (time - a[0]) / (b[0] - a[0]);
        return a.slice(1).map((value, j) => value + (b[j + 1] - value) * p);
      }
    }
    return frames[frames.length - 1].slice(1);
  }

  function measureVideo() {
    // Fit the desktop stage to the footage plus its caption, capped at the viewport.
    // Reserve caption space so contained video cannot leave a large band above it.
    const navHeight = parseFloat(section.style.getPropertyValue('--inspection-nav')) || 64;
    const footerHeight = bottom.offsetHeight;
    section.style.setProperty('--inspection-footer-height', footerHeight + 'px');
    const stageHeight = window.innerWidth > INSPECTION_CONFIG.mobileBreakpoint
      ? Math.min(window.innerHeight - navHeight, media.clientWidth * 902 / 1600 + footerHeight)
      : window.innerHeight - navHeight;
    section.style.setProperty('--inspection-stage-height', stageHeight + 'px');
    // Matches object-fit: contain and object-position: 50% 0 in inspection.css.
    const width = video.videoWidth || 1600, height = video.videoHeight || 902;
    const scale = Math.min(media.clientWidth / width, media.clientHeight / height);
    bounds = { width: width * scale, height: height * scale,
      left: (media.clientWidth - width * scale) / 2, top: 0 };
  }

  function renderLinks() {
    // The card sits outside the media on small screens. Measure in one shared
    // stage coordinate space so the callouts also work with letterboxed video.
    const frame = stage.getBoundingClientRect();
    const box = marker.getBoundingClientRect();
    const label = tag.getBoundingClientRect();
    const card = evidence.getBoundingClientRect();
    const mobile = window.innerWidth <= INSPECTION_CONFIG.mobileBreakpoint;
    const left = box.left - frame.left, top = box.top - frame.top;
    const x = mobile ? left + box.width / 2 : left + box.width;
    const y = mobile ? top : top + box.height / 2;
    const labelX = label.left - frame.left + label.width / 2;
    const labelY = label.bottom - frame.top + 3;
    links.setAttribute('viewBox', `0 0 ${frame.width} ${frame.height}`);
    tagPath.setAttribute('d', `M ${x} ${y} H ${labelX} V ${labelY}`);
    tagPoint.setAttribute('cx', x);
    tagPoint.setAttribute('cy', y);
    // Desktop only: keep the leader in the clear space left of the observation.
    const cardX = card.right - frame.left + 4;
    const cardY = card.top - frame.top + card.height / 2;
    const anchorY = top + box.height * .38;
    const elbowX = (left + cardX) / 2;
    evidencePath.setAttribute('d', `M ${left} ${anchorY} H ${elbowX} V ${cardY} H ${cardX}`);
    evidencePoint.setAttribute('cx', left);
    evidencePoint.setAttribute('cy', anchorY);
  }

  function render(time) {
    displayedTime = time;
    const t = INSPECTION_CONFIG.timeline;
    const approachOpacity = 1 - clamp((time - t.approachOut) / (t.cut - t.approachOut));
    const captureOpacity = fade(time, t.capture), closingOpacity = fade(time, t.finding);
    if (time >= t.finding) section.classList.add('is-closing');
    else section.classList.remove('is-closing');
    section.style.setProperty('--inspection-approach', approachOpacity);
    section.style.setProperty('--inspection-target', fade(time, t.target));
    section.style.setProperty('--inspection-evidence', captureOpacity);
    section.style.setProperty('--inspection-finding', closingOpacity);
    section.style.setProperty('--inspection-closing', closingOpacity);
    section.style.setProperty('--inspection-progress', duration ? clamp(time / duration) : 0);
    mode.textContent = time < t.cut ? 'Aerial inspection' : 'Inspection camera';
    approach.setAttribute('aria-hidden', String(approachOpacity === 0));
    closing.setAttribute('aria-hidden', String(closingOpacity === 0));
    evidence.setAttribute('aria-hidden', String(captureOpacity === 0));
    finding.setAttribute('aria-hidden', String(closingOpacity === 0));
    const [x, y, width, height] = damageAt(time);
    marker.style.left = bounds.left + x * bounds.width + 'px';
    marker.style.top = bounds.top + y * bounds.height + 'px';
    marker.style.width = width * bounds.width + 'px';
    marker.style.height = height * bounds.height + 'px';
    renderLinks();
  }

  function cancelSeek() {
    seekGeneration++;
    clearTimeout(watchdog);
    if (frameRequest !== null && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frameRequest);
    frameRequest = null;
    busy = false;
    seekingStarted = false;
  }

  function fallback(message) {
    if (message) failed = true;
    active = false;
    cancelSeek();
    clearTimeout(loadTimer);
    loadTimer = 0;
    video.pause();
    section.classList.remove('is-interactive', 'is-ready');
    status.textContent = message || '';
    mode.textContent = 'Aerial inspection';
    observer?.disconnect();
  }

  function schedule() {
    if (!raf && active && !document.hidden) raf = requestAnimationFrame(update);
  }

  function completeSeek(time, generation) {
    if (!active || generation !== seekGeneration) return;
    render(time);
    // requestVideoFrameCallback can arrive just before the seeked event.
    if (video.seeking) return;
    cancelSeek();
    status.textContent = '';
    schedule();
  }

  function seek(time) {
    if (busy || video.seeking || !loaded || Math.abs(video.currentTime - time) < .5 / INSPECTION_CONFIG.fps) return;
    busy = true;
    seekingStarted = false;
    const generation = ++seekGeneration;
    if (video.requestVideoFrameCallback) {
      frameRequest = video.requestVideoFrameCallback((_, metadata) => {
        frameRequest = null;
        completeSeek(metadata.mediaTime, generation);
      });
    }
    watchdog = setTimeout(() => fallback('The interactive footage is unavailable. Explore aerial inspection below.'), 15000);
    try { video.currentTime = time; }
    catch { fallback('The interactive footage is unavailable. Explore aerial inspection below.'); }
  }

  function update() {
    raf = 0;
    if (!active) return;
    const top = parseFloat(section.style.getPropertyValue('--inspection-nav')) || 64;
    const introHeight = intro.offsetHeight;
    const travel = Math.max(1, section.offsetHeight - introHeight - stage.offsetHeight);
    const progress = clamp((top - section.getBoundingClientRect().top - introHeight) / travel);
    // Exact frame mapping: no easing tail or playback after scrolling stops.
    desiredTime = Math.min(duration, Math.floor(progress * duration * INSPECTION_CONFIG.fps + .0001) / INSPECTION_CONFIG.fps);
    seek(desiredTime);
  }

  function load() {
    if (!active || loaded) return;
    status.textContent = 'Preparing inspection footage...';
    if (!video.getAttribute('src')) {
      video.preload = 'auto';
      video.src = video.dataset.src;
      video.load();
    }
    if (!loadTimer) loadTimer = setTimeout(() => fallback('The footage is taking longer to load. Explore aerial inspection below.'), INSPECTION_CONFIG.loadingTimeout);
  }

  function layout() {
    const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 64;
    section.style.setProperty('--inspection-nav', navHeight + 'px');
    section.style.setProperty('--inspection-intro-height', intro.offsetHeight + 'px');
    const screens = window.innerWidth <= INSPECTION_CONFIG.mobileBreakpoint ? INSPECTION_CONFIG.scrollScreens.mobile : INSPECTION_CONFIG.scrollScreens.desktop;
    section.style.setProperty('--inspection-travel', screens * 100 + 'svh');
    if (!('IntersectionObserver' in window) || motion.matches || window.innerHeight < INSPECTION_CONFIG.minimumHeight) { fallback(''); return; }
    if (failed) return;
    active = true;
    section.classList.add('is-interactive');
    if (loaded) section.classList.add('is-ready');
    measureVideo();
    render(displayedTime);
    observer?.observe(section);
    schedule();
  }

  listen(video, 'loadedmetadata', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) { fallback('Inspection footage is unavailable.'); return; }
    // Seeking to duration itself can produce an ended/blank frame.
    duration = Math.max(0, video.duration - 1 / INSPECTION_CONFIG.fps);
    measureVideo();
  });
  listen(video, 'loadeddata', () => {
    if (failed) return;
    loaded = true;
    clearTimeout(loadTimer);
    loadTimer = 0;
    status.textContent = '';
    if (active) section.classList.add('is-ready');
    render(video.currentTime);
    schedule();
  });
  listen(video, 'seeking', () => { seekingStarted = true; });
  listen(video, 'seeked', () => {
    if (!busy || !seekingStarted) return;
    const generation = seekGeneration;
    // rVFC gives the actual presented timestamp. Two paint opportunities provide
    // a bounded fallback for browsers which omit callbacks for paused seeks.
    if (!video.requestVideoFrameCallback) completeSeek(video.currentTime, generation);
    else requestAnimationFrame(() => requestAnimationFrame(() => completeSeek(video.currentTime, generation)));
  });
  listen(video, 'error', () => fallback('Inspection footage is unavailable. Explore aerial inspection below.'));
  listen(video, 'play', () => video.pause());
  listen(window, 'scroll', schedule, { passive: true });
  listen(window, 'resize', layout, { passive: true });
  listen(motion, 'change', layout);
  listen(document, 'visibilitychange', () => { if (!document.hidden) schedule(); });
  listen(window, 'pagehide', event => {
    if (event.persisted) { cancelSeek(); return; }
    active = false;
    cancelAnimationFrame(raf);
    cancelSeek();
    clearTimeout(loadTimer);
    observer?.disconnect();
    resizeObserver?.disconnect();
    introObserver?.disconnect();
    events.abort();
  });
  listen(window, 'pageshow', event => { if (event.persisted) layout(); });
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(() => { measureVideo(); render(displayedTime); }) : null;
  resizeObserver?.observe(media);
  resizeObserver?.observe(evidence);
  resizeObserver?.observe(tag);
  resizeObserver?.observe(bottom);
  const introObserver = 'ResizeObserver' in window ? new ResizeObserver(() => {
    section.style.setProperty('--inspection-intro-height', intro.offsetHeight + 'px');
    schedule();
  }) : null;
  introObserver?.observe(intro);
  if (!('IntersectionObserver' in window)) return; // Static, usable no-observer fallback.
  observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) load(); }, { rootMargin: '100% 0px' });
  video.muted = true;
  layout();
})();
