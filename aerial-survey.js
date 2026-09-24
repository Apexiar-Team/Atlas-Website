/* Decorative survey terrain: illustrative geometry, never operational data. */
(() => {
  'use strict';
  const root = document.querySelector('[data-aerial-survey]');
  if (!root) return;
  const canvas = root.querySelector('.aerial-survey__canvas');
  const context = canvas?.getContext('2d');
  if (!context) return; // The CSS atmosphere and every content section remain available.
  const playback = root.querySelector('[data-survey-playback]');

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealDuration = 4800;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => value * value * (3 - 2 * value);
  const mix = (a, b, amount) => a + (b - a) * amount;
  let nearViewport = false;
  let suspended = document.hidden;
  let failed = false;
  let frame = 0;
  let cache = null;
  let clouds = null;
  let lastProgress = -1;
  let lastWidth = 0;
  let lastHeight = 0;
  let lastDensity = 0;
  let elapsed = motion.matches ? revealDuration : 0;
  let previousTime = null;
  let flowTime = 0;
  let lastFlowTime = -1;
  let userPaused = false;
  let motionOptIn = false;

  function isMoving() {
    return !userPaused && (!motion.matches || motionOptIn);
  }

  function noise(x, y) {
    const hash = (a, b) => {
      let n = Math.imul(a, 374761393) + Math.imul(b, 668265263);
      n = Math.imul(n ^ (n >>> 13), 1274126177);
      return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
    };
    const a = Math.floor(x), b = Math.floor(y);
    const u = smooth(x - a), v = smooth(y - b);
    return mix(mix(hash(a, b), hash(a + 1, b), u), mix(hash(a, b + 1), hash(a + 1, b + 1), u), v);
  }

  function makeClouds() {
    const texture = document.createElement('canvas');
    texture.width = 384;
    texture.height = 256;
    const ctx = texture.getContext('2d');
    if (!ctx) throw new Error('Cloud canvas unavailable');
    const image = ctx.createImageData(texture.width, texture.height);
    for (let y = 0; y < texture.height; y++) {
      for (let x = 0; x < texture.width; x++) {
        let value = 0, weight = .55, frequency = .016;
        for (let octave = 0; octave < 5; octave++) {
          // Match the left/right edges so clouds can flow continuously through
          // the scene, rather than easing to a standstill and reversing.
          const across = smooth(x / texture.width);
          value += mix(
            noise(x * frequency + 19, y * frequency + 7),
            noise((x - texture.width) * frequency + 19, y * frequency + 7),
            across
          ) * weight;
          frequency *= 2.07;
          weight *= .5;
        }
        const index = (y * texture.width + x) * 4;
        image.data[index] = 122 + value * 90;
        image.data[index + 1] = 161 + value * 72;
        image.data[index + 2] = 182 + value * 65;
        image.data[index + 3] = clamp((value - .28) * 2.5) * 245;
      }
    }
    ctx.putImageData(image, 0, 0);
    return texture;
  }

  function layer(width, height, pixelWidth, pixelHeight) {
    const element = document.createElement('canvas');
    element.width = pixelWidth;
    element.height = pixelHeight;
    const ctx = element.getContext('2d');
    if (!ctx) throw new Error('Survey canvas unavailable');
    ctx.setTransform(pixelWidth / width, 0, 0, pixelHeight / height, 0, 0);
    return { element, ctx };
  }

  function prepare(width, height, density) {
    // Bound the backing store on tall mobile layouts and high-density monitors.
    const scale = Math.min(density, Math.sqrt(1800000 / (width * height)));
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    const base = layer(width, height, canvas.width, canvas.height);
    const terrain = layer(width, height, canvas.width, canvas.height);
    const connections = layer(width, height, canvas.width, canvas.height);

    const sky = base.ctx.createLinearGradient(0, 0, width, height);
    sky.addColorStop(0, '#163348');
    sky.addColorStop(.4, '#315b72');
    sky.addColorStop(.74, '#234b62');
    sky.addColorStop(1, '#102a40');
    base.ctx.fillStyle = sky;
    base.ctx.fillRect(0, 0, width, height);
    const sunlight = base.ctx.createRadialGradient(width * .84, height * .25, 0, width * .84, height * .25, Math.max(width, height) * .78);
    sunlight.addColorStop(0, '#c0e6f470');
    sunlight.addColorStop(.42, '#83cdeb25');
    sunlight.addColorStop(1, '#83cdeb00');
    base.ctx.fillStyle = sunlight;
    base.ctx.fillRect(0, 0, width, height);

    // An abstract relief surface, with perspective and a shallow valley.
    const point = (u, v) => {
      const elevation = Math.sin(u * 7.5 + v * 3) * .028 + Math.cos(u * 12 - v * 5) * .012 + noise(u * 4, v * 3) * .04;
      return {
        x: width * (.5 + (u - .5) * (.64 + v * .7)),
        y: height * (.08 + v * 1.02 - elevation * (.5 + v))
      };
    };
    const ctx = terrain.ctx;
    const rows = width < 640 ? 30 : 42;
    const columns = width < 640 ? 28 : 56;
    ctx.lineWidth = .8;
    for (let j = 0; j <= rows; j++) {
      ctx.strokeStyle = j % 5 === 0 ? '#abeaff99' : '#83d0ec50';
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const p = point(i / 100, j / rows);
        if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = '#76c9e43d';
    for (let i = 0; i <= columns; i++) {
      ctx.beginPath();
      for (let j = 0; j <= 72; j++) {
        const p = point(i / columns, j / 72);
        if (j) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = '#d1f5ff';
    for (let i = 0; i <= columns; i++) {
      for (let j = 0; j <= rows; j++) {
        const p = point(i / columns, j / rows);
        ctx.globalAlpha = .28 + noise(i * 3, j * 3) * .6;
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
    }

    const route = [[.83, .13], [.92, .37], [.8, .58], [.88, .73], [.65, .88], [.36, .82], [.12, .91]];
    const gold = connections.ctx;
    gold.strokeStyle = '#edc67c';
    gold.fillStyle = '#fff1c9';
    gold.lineWidth = 1.3;
    gold.shadowColor = '#d4a24c';
    gold.shadowBlur = 10;
    gold.beginPath();
    route.forEach(([u, v], i) => {
      if (i) gold.lineTo(width * u, height * v); else gold.moveTo(width * u, height * v);
    });
    gold.stroke();
    route.forEach(([u, v]) => {
      gold.beginPath(); gold.arc(width * u, height * v, 3, 0, Math.PI * 2); gold.fill();
      gold.beginPath(); gold.arc(width * u, height * v, 8, 0, Math.PI * 2); gold.stroke();
    });
    gold.shadowBlur = 0;
    gold.globalAlpha = .65;
    // Restrained turbine and pylon outlines anchor the decorative survey to infrastructure.
    const size = Math.min(width * .035, 46);
    const turbineX = width * .83, turbineY = height * .13;
    gold.beginPath(); gold.moveTo(turbineX, turbineY); gold.lineTo(turbineX, turbineY - size);
    for (let arm = 0; arm < 3; arm++) {
      const angle = -Math.PI / 2 + arm * Math.PI * 2 / 3;
      gold.moveTo(turbineX, turbineY - size);
      gold.lineTo(turbineX + Math.cos(angle) * size * .62, turbineY - size + Math.sin(angle) * size * .62);
    }
    gold.stroke();
    const pylonX = width * .88, pylonY = height * .73;
    gold.beginPath();
    gold.moveTo(pylonX - size * .25, pylonY); gold.lineTo(pylonX, pylonY - size); gold.lineTo(pylonX + size * .25, pylonY);
    gold.moveTo(pylonX - size * .42, pylonY - size * .62); gold.lineTo(pylonX + size * .42, pylonY - size * .62);
    gold.moveTo(pylonX - size * .3, pylonY - size * .82); gold.lineTo(pylonX + size * .3, pylonY - size * .82);
    gold.stroke();
    if (!clouds) clouds = makeClouds();
    cache = { base: base.element, terrain: terrain.element, connections: connections.element };
    lastWidth = width; lastHeight = height; lastDensity = density;
  }

  function draw(timestamp) {
    frame = 0;
    if (!nearViewport || suspended || failed) return;
    try {
      const width = root.clientWidth, height = root.clientHeight;
      if (!width || !height) return;
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      const changed = width !== lastWidth || height !== lastHeight || density !== lastDensity;
      const moving = isMoving();
      if (moving) {
        if (previousTime !== null) {
          const delta = Math.max(0, timestamp - previousTime);
          elapsed = Math.min(revealDuration, elapsed + delta);
          flowTime += delta;
        }
        previousTime = timestamp;
      }
      const progress = motion.matches && !motionOptIn ? 1 : clamp(elapsed / revealDuration);
      if (!changed && progress === lastProgress && flowTime === lastFlowTime) {
        continueAnimation();
        return;
      }
      // Keep ambient canvas painting near 30fps, even on high-refresh displays.
      if (!changed && moving && lastProgress >= 0 && flowTime - lastFlowTime < 1000 / 30 - 2) {
        continueAnimation();
        return;
      }
      if (changed) prepare(width, height, density);
      const reveal = smooth(clamp((progress - .08) / .7));
      context.globalAlpha = 1;
      context.drawImage(cache.base, 0, 0, width, height);
      context.globalAlpha = .12 + reveal * .78;
      context.drawImage(cache.terrain, 0, 0, width, height);
      context.globalAlpha = smooth(clamp((progress - .35) / .5)) * .85;
      context.drawImage(cache.connections, 0, 0, width, height);
      context.save();
      // Two seamless cloud bands move at a steady, visibly different pace.
      // The clock keeps running after the entrance reveal, without scrolling.
      const tileWidth = width * 1.1;
      const drift = (flowTime / 42000 % 1) * tileWidth;
      const counterDrift = (flowTime / 67000 % 1) * tileWidth;
      context.globalAlpha = .9 - reveal * .42;
      context.drawImage(clouds, -drift, -height * .06, tileWidth, height * 1.16);
      context.drawImage(clouds, tileWidth - drift, -height * .06, tileWidth, height * 1.16);
      context.globalAlpha = .45 - reveal * .15;
      context.translate(width, height);
      context.rotate(Math.PI);
      context.drawImage(clouds, -counterDrift, -height * .06, tileWidth, height * 1.2);
      context.drawImage(clouds, tileWidth - counterDrift, -height * .06, tileWidth, height * 1.2);
      context.restore();
      // The entrance reveal runs on its own clock; scrolling never scrubs it.
      if (!motion.matches && progress > .05 && progress < .92) {
        const x = width * (1.15 - progress * 1.4), spread = Math.max(50, width * .09);
        const sweep = context.createLinearGradient(x - spread, 0, x + spread, 0);
        sweep.addColorStop(0, '#9ce5ff00'); sweep.addColorStop(.5, '#b3edff24'); sweep.addColorStop(1, '#9ce5ff00');
        context.globalAlpha = Math.sin(progress * Math.PI);
        context.fillStyle = sweep;
        context.fillRect(x - spread, 0, spread * 2, height);
      }
      context.globalAlpha = 1;
      lastProgress = progress;
      lastFlowTime = flowTime;
      root.classList.add('aerial-survey--ready');
      updatePlayback();
      continueAnimation();
    } catch (_) {
      failed = true;
      root.classList.remove('aerial-survey--ready');
      updatePlayback();
    }
  }

  function schedule() {
    if (!frame && nearViewport && !suspended && !failed) frame = window.requestAnimationFrame(draw);
  }
  function continueAnimation() {
    if (isMoving()) schedule();
  }
  function updatePlayback() {
    if (!playback) return;
    playback.hidden = failed || !cache;
    playback.textContent = isMoving() ? 'Pause clouds' : userPaused ? 'Resume clouds' : 'Play clouds';
    playback.title = motion.matches && !motionOptIn
      ? 'Clouds are paused for your reduced-motion preference. Select to play.'
      : '';
  }
  function cancel() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = null;
  }
  function setVisible(visible) {
    nearViewport = visible;
    if (nearViewport) schedule(); else cancel();
  }
  function checkVisibility() {
    const rect = root.getBoundingClientRect();
    setVisible(rect.bottom > 0 && rect.top < window.innerHeight * .88);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      setVisible(entries.some(entry => entry.isIntersecting));
    }, { rootMargin: '0px 0px -12% 0px' });
    observer.observe(root);
  } else {
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
  }
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(root);
  window.addEventListener('resize', 'IntersectionObserver' in window ? schedule : checkVisibility, { passive: true });
  motion.addEventListener('change', () => {
    motionOptIn = false;
    if (motion.matches) elapsed = revealDuration;
    lastProgress = -1;
    cancel();
    updatePlayback();
    schedule();
  });
  playback?.addEventListener('click', () => {
    if (isMoving()) {
      userPaused = true;
    } else {
      userPaused = false;
      motionOptIn = motion.matches;
    }
    cancel();
    updatePlayback();
    schedule();
  });
  document.addEventListener('visibilitychange', () => {
    suspended = document.hidden;
    if (suspended) cancel(); else schedule();
  });
  window.addEventListener('pagehide', () => { suspended = true; cancel(); });
  window.addEventListener('pageshow', () => { suspended = document.hidden; schedule(); });
  canvas.addEventListener('contextlost', event => {
    event.preventDefault(); failed = true; cancel(); root.classList.remove('aerial-survey--ready');
    updatePlayback();
  });
  canvas.addEventListener('contextrestored', () => {
    failed = false; cache = null; clouds = null; lastWidth = 0; lastProgress = -1; schedule();
  });
})();
