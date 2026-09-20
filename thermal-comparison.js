/* Native range semantics, pointer enhancement and full-width clipped imagery. */
(() => {
  'use strict';
  document.querySelectorAll('[data-thermal-comparison]').forEach(comparison => {
    const frame = comparison.querySelector('.thermal-comparison__frame');
    const visible = comparison.querySelector('.thermal-comparison__visible');
    const thermal = comparison.querySelector('.thermal-comparison__thermal');
    const range = comparison.querySelector('input[type="range"]');
    const thermalLabel = comparison.querySelector('.thermal-comparison__label--thermal');
    const visibleLabel = comparison.querySelector('.thermal-comparison__label--visible');
    const status = comparison.querySelector('.thermal-comparison__status');
    let ready = false, failed = false, gesture = null;
    const clamp = value => Math.max(0, Math.min(100, value));

    function render() {
      const value = clamp(Number(range.value));
      const width = frame.getBoundingClientRect().width;
      comparison.style.setProperty('--reveal', value + '%');
      range.setAttribute('aria-valuetext', `${value}% thermal view, ${100 - value}% visible-light view`);
      comparison.classList.toggle('is-start', value * width / 100 < 22);
      comparison.classList.toggle('is-end', (100 - value) * width / 100 < 22);
      // Each label stays in its own imaging mode. Hide it before the divider
      // reaches it, allowing for the 12px inset and half the visual handle.
      thermalLabel.hidden = false;
      visibleLabel.hidden = false;
      const thermalSpace = thermalLabel.offsetWidth + 34;
      const visibleSpace = visibleLabel.offsetWidth + 34;
      thermalLabel.hidden = !ready || value * width / 100 < thermalSpace;
      visibleLabel.hidden = ready && (100 - value) * width / 100 < visibleSpace;
    }

    function fail() {
      failed = true;
      ready = false;
      gesture = null;
      range.disabled = true;
      comparison.classList.remove('is-ready');
      thermalLabel.hidden = true;
      visibleLabel.hidden = false;
      status.textContent = visible.complete && !visible.naturalWidth
        ? 'Comparison imagery is unavailable.'
        : 'Thermal view unavailable. Showing the visible image.';
    }

    function imageReady(img) {
      return new Promise((resolve, reject) => {
        const loaded = () => img.naturalWidth ? resolve() : reject(new Error('Missing image'));
        if (img.complete) loaded();
        else {
          img.addEventListener('load', loaded, { once: true });
          img.addEventListener('error', reject, { once: true });
        }
      }).then(() => img.decode ? img.decode() : undefined);
    }

    [visible, thermal].forEach(img => img.addEventListener('error', fail));
    Promise.all([imageReady(visible), imageReady(thermal)]).then(() => {
      if (failed) return;
      if (visible.naturalWidth !== thermal.naturalWidth || visible.naturalHeight !== thermal.naturalHeight) { fail(); return; }
      ready = true;
      range.disabled = false;
      comparison.classList.add('is-ready');
      status.textContent = '';
      render();
    }).catch(fail);

    function revealAt(clientX) {
      const rect = frame.getBoundingClientRect();
      if (!rect.width) return;
      range.value = String(Math.round(clamp((clientX - rect.left) / rect.width * 100)));
      render();
    }

    // Arrow keys, Home/End and assistive technology use the native input.
    range.addEventListener('input', render);
    frame.addEventListener('pointerdown', event => {
      if (!ready || event.isPrimary === false || event.button !== 0) return;
      const mouse = event.pointerType === 'mouse';
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: mouse };
      if (mouse) {
        event.preventDefault();
        range.focus({ preventScroll: true });
        frame.setPointerCapture(event.pointerId);
        revealAt(event.clientX);
      }
    });
    frame.addEventListener('pointermove', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      if (!gesture.dragging) {
        const dx = Math.abs(event.clientX - gesture.x), dy = Math.abs(event.clientY - gesture.y);
        if (Math.max(dx, dy) < 8) return;
        // Leave vertical gestures entirely to the browser's normal scrolling.
        if (dy >= dx) { gesture = null; return; }
        gesture.dragging = true;
        range.focus({ preventScroll: true });
        frame.setPointerCapture(event.pointerId);
      }
      revealAt(event.clientX);
    }, { passive: true });
    frame.addEventListener('pointerup', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      revealAt(event.clientX);
      gesture = null;
      if (frame.hasPointerCapture(event.pointerId)) frame.releasePointerCapture(event.pointerId);
    });
    ['pointercancel', 'lostpointercapture'].forEach(name => frame.addEventListener(name, () => { gesture = null; }));
    if ('ResizeObserver' in window) new ResizeObserver(() => { if (ready) render(); }).observe(frame);
    else window.addEventListener('resize', () => { if (ready) render(); }, { passive: true });
    // Until both images load, the existing visible image is the only view.
    render();
  });
})();
