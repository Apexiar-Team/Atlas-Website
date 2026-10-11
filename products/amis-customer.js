(() => {
  'use strict';
  const root = document.querySelector('.customer-page');
  if (!root) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const control = root.querySelector('[data-effects-control]');
  const hero = root.querySelector('.customer-hero');
  let paused = false;
  let syncPhoneMotion;
  const revealTargets = [...root.querySelectorAll('[data-reveal], .customer-heading, .customer-features article, .customer-governance, .customer-related a')];
  const sequences = [...root.querySelectorAll('.customer-pipeline, .customer-event-cycle')];
  const syncMotion = () => {
    root.classList.toggle('customer-effects-paused', paused || motion.matches);
    if (control) {
      control.hidden = motion.matches;
      control.setAttribute('aria-pressed', String(paused));
      control.querySelector('[data-effects-label]').textContent = paused ? 'Resume effects' : 'Pause effects';
      control.title = paused ? 'Resume effects' : 'Pause effects';
      control.querySelector('[aria-hidden]').textContent = paused ? '\u25b6' : '\u275a\u275a';
    }
    if (paused || motion.matches) {
      revealTargets.forEach(element => element.classList.remove('customer-reveal-pending'));
    }
    syncPhoneMotion?.();
  };
  control?.addEventListener('click', () => { paused = !paused; syncMotion(); });
  motion.addEventListener('change', syncMotion);
  syncMotion();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('customer-reveal-pending');
        entry.target.classList.add('customer-sequence-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(element => {
      element.classList.add('customer-reveal');
      if (!motion.matches && element.getBoundingClientRect().top > window.innerHeight) element.classList.add('customer-reveal-pending');
      observer.observe(element);
    });
    sequences.forEach(element => observer.observe(element));
    const heroObserver = new IntersectionObserver(entries => {
      hero?.classList.toggle('customer-hero-inview', entries.some(entry => entry.isIntersecting));
    });
    if (hero) heroObserver.observe(hero);
  }
  root.addEventListener('focusin', event => event.target.closest('.customer-reveal-pending')?.classList.remove('customer-reveal-pending'));
  const syncVisibility = () => root.classList.toggle('customer-effects-suspended', document.hidden);
  document.addEventListener('visibilitychange', syncVisibility);
  window.addEventListener('pagehide', () => root.classList.add('customer-effects-suspended'));
  window.addEventListener('pageshow', syncVisibility);
  syncVisibility();

  const screens = {
    pressure: { src: '../assets/Design/AMIS-Customer/service-pressure.webp', width: 1212, height: 502, alt: 'Service metrics and operational pressure, including response times, SLA attainment and overdue backlog', caption: 'Service pressure detail from the AMIS Customer workspace.' },
    briefing: { src: '../assets/Design/AMIS-Customer/executive-briefing.webp', width: 1212, height: 686, alt: 'Executive briefing with a management summary, priority issues and service context', caption: 'Executive briefing detail from the same supplied dashboard.' },
    workspace: { src: '../assets/Design/AMIS-Customer/dashboard-full.png', width: 2304, height: 1560, alt: 'Complete AMIS Customer strategic dashboard with navigation, filters, service metrics and executive briefing', caption: 'Full strategic dashboard from the supplied AMIS Customer booklet.' }
  };
  const tablist = root.querySelector('.customer-screen-tabs');
  const panel = root.querySelector('#customer-screen');
  if (tablist && panel) {
    const tabs = [...tablist.querySelectorAll('[data-screen]')];
    const image = panel.querySelector('img');
    const caption = root.querySelector('[data-screen-caption]');
    const select = tab => {
      const screen = screens[tab.dataset.screen];
      if (!screen) return;
      tabs.forEach(button => {
        button.setAttribute('aria-selected', String(button === tab));
        button.tabIndex = button === tab ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      panel.dataset.view = tab.dataset.screen;
      image.src = screen.src;
      image.width = screen.width;
      image.height = screen.height;
      image.alt = screen.alt;
      caption.textContent = screen.caption;
    };
    tabs.forEach(tab => tab.addEventListener('click', () => select(tab)));
    tablist.addEventListener('keydown', event => {
      const current = tabs.indexOf(document.activeElement);
      if (current < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[next]);
      tabs[next].focus();
    });
    tablist.hidden = false;
  }

  const eventSteps = [...root.querySelectorAll('.customer-event-cycle li')];
  root.querySelectorAll('[data-event-stage]').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      eventSteps.forEach((step, index) => step.classList.toggle('customer-event-active', index === Number(details.dataset.eventStage)));
    });
  });

  const reportDurations = [2800, 4200, 5200, 3800, 4500];
  const reportStarts = reportDurations.map((duration, index) => reportDurations.slice(0, index).reduce((total, value) => total + value, 0));
  const reportLength = reportDurations.reduce((total, duration) => total + duration, 0);
  const reportDescription = 'Customer behaviour reported near platform 2. Additional staff support requested.';
  const getReportFrame = (elapsed, settled = false) => {
    const time = Math.max(0, Math.min(reportLength, Number.isFinite(elapsed) ? elapsed : 0));
    const stage = Math.max(0, reportStarts.findLastIndex(start => time >= start));
    const progress = (time - reportStarts[stage]) / reportDurations[stage];
    const reached = (step, threshold) => stage > step || (stage === step && (settled || progress >= threshold));
    const typed = stage > 2 || settled ? reportDescription.length : Math.floor(reportDescription.length * Math.max(0, Math.min(1, (progress - .1) / .75)));
    return {
      stage, progress: (settled ? reportStarts[stage] + reportDurations[stage] : time) / reportLength, review: stage === 4,
      values: {
        incident: reached(0, .3) ? 'Abusive Customer' : '',
        station: reached(1, .15) ? 'Blackheath (BLH)' : '',
        location: reached(1, .4) ? 'Train - NORTH' : '',
        date: reached(1, .65) ? '11/10/2026' : '',
        time: reached(1, .65) ? '20:22' : '',
        description: stage >= 2 ? reportDescription.slice(0, typed) : '',
        event: reached(3, .3) ? 'Example event' : ''
      }
    };
  };

  const phoneDemo = root.querySelector('[data-phone-demo]');
  if (phoneDemo) {
    const steps = [...phoneDemo.querySelectorAll('[data-report-step]')];
    const groups = [...phoneDemo.querySelectorAll('[data-report-group]')];
    const fields = Object.fromEntries(['incident', 'station', 'location', 'date', 'time', 'description', 'event'].map(name => [name, phoneDemo.querySelector('#demo-' + name)]));
    const scroll = phoneDemo.querySelector('[data-report-scroll]');
    const play = phoneDemo.querySelector('[data-report-play]');
    const previous = phoneDemo.querySelector('[data-report-previous]');
    const next = phoneDemo.querySelector('[data-report-next]');
    const replay = phoneDemo.querySelector('[data-report-replay]');
    const reviewButton = phoneDemo.querySelector('[data-report-review-button]');
    const announcement = phoneDemo.querySelector('[data-report-announcement]');
    let elapsed = 0;
    let playing = false;
    let settled = false;
    let started = false;
    let inView = false;
    let pageActive = true;
    let frame = null;
    let previousTime = null;
    let currentStage = -1;
    const syncControls = () => {
      const label = playing ? 'Pause demonstration' : elapsed >= reportLength ? 'Replay demonstration' : 'Play demonstration';
      play.setAttribute('aria-label', label);
      play.title = label;
      play.querySelector('[data-report-play-icon]').textContent = playing ? '\u275a\u275a' : '\u25b6';
      play.disabled = paused;
      phoneDemo.dataset.playing = String(playing);
      previous.disabled = currentStage <= 0;
      next.disabled = currentStage === steps.length - 1;
    };
    const render = (instant = false) => {
      const state = getReportFrame(elapsed, settled || motion.matches);
      Object.entries(state.values).forEach(([name, value]) => { if (fields[name].value !== value) fields[name].value = value; });
      phoneDemo.querySelector('[data-report-count]').textContent = state.values.description.length + ' / 1000';
      phoneDemo.querySelector('[data-report-progress]').value = state.progress;
      if (state.stage !== currentStage) {
        currentStage = state.stage;
        phoneDemo.dataset.stage = String(currentStage);
        steps.forEach((step, index) => {
          if (index === currentStage) step.setAttribute('aria-current', 'step');
          else step.removeAttribute('aria-current');
        });
        groups.forEach((group, index) => group.classList.toggle('is-active', index === currentStage));
        phoneDemo.querySelector('[data-report-position]').textContent = '0' + (currentStage + 1) + ' / 05';
        phoneDemo.querySelector('[data-report-fields]').hidden = state.review;
        phoneDemo.querySelector('[data-report-review]').hidden = !state.review;
        phoneDemo.querySelector('[data-report-title]').textContent = state.review ? 'Demonstration review' : 'Report an incident';
        phoneDemo.querySelector('[data-report-footer]').textContent = state.review ? 'No report sent' : 'Example data';
        reviewButton.textContent = state.review ? 'Replay' : 'Review example';
        syncControls();
      }
      const target = state.review ? 0 : Math.max(0, groups[currentStage].offsetTop - 12);
      const top = Math.min(target, Math.max(0, scroll.scrollHeight - scroll.clientHeight));
      scroll.scrollTop = instant || motion.matches ? top : scroll.scrollTop + (top - scroll.scrollTop) * .16;
    };
    const cancelFrame = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      previousTime = null;
    };
    const stop = () => {
      playing = false;
      cancelFrame();
      syncControls();
    };
    const tick = time => {
      frame = null;
      if (!playing || !inView || document.hidden || !pageActive || paused) { previousTime = null; return; }
      if (previousTime !== null) elapsed = Math.min(reportLength, elapsed + Math.min(80, time - previousTime));
      previousTime = time;
      render();
      if (elapsed >= reportLength) stop();
      else frame = window.requestAnimationFrame(tick);
    };
    const schedule = () => {
      cancelFrame();
      if (playing && inView && !document.hidden && pageActive && !paused) frame = window.requestAnimationFrame(tick);
    };
    const start = () => {
      if (paused) return;
      if (elapsed >= reportLength) elapsed = 0;
      settled = false;
      playing = true;
      started = true;
      render(true);
      syncControls();
      schedule();
    };
    const selectStep = index => {
      stop();
      started = true;
      settled = true;
      elapsed = reportStarts[Math.max(0, Math.min(steps.length - 1, index))];
      render(true);
      announcement.textContent = 'Step ' + (currentStage + 1) + ' of 5: ' + steps[currentStage].querySelector('strong').textContent;
    };
    const restart = () => {
      elapsed = 0;
      if (paused) selectStep(0);
      else start();
    };
    steps.forEach(step => {
      step.disabled = false;
      step.title = step.querySelector('strong').textContent;
      step.addEventListener('click', () => selectStep(Number(step.dataset.reportStep)));
    });
    play.addEventListener('click', () => { if (playing) stop(); else start(); });
    previous.addEventListener('click', () => selectStep(currentStage - 1));
    next.addEventListener('click', () => selectStep(currentStage + 1));
    replay.addEventListener('click', restart);
    reviewButton.addEventListener('click', () => { if (currentStage === 4) restart(); else selectStep(4); });
    ['pointerdown', 'wheel', 'focusin', 'keydown'].forEach(name => scroll.addEventListener(name, stop, { passive: true }));
    phoneDemo.querySelector('[data-report-summary]').textContent = reportDescription;
    phoneDemo.querySelector('[data-report-controls]').hidden = false;
    reviewButton.disabled = false;
    syncPhoneMotion = () => { if (paused || motion.matches) stop(); syncControls(); };
    document.addEventListener('visibilitychange', schedule);
    window.addEventListener('pagehide', () => { pageActive = false; schedule(); });
    window.addEventListener('pageshow', () => { pageActive = true; schedule(); });
    render(true);
    syncPhoneMotion();
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        inView = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .25);
        if (inView && !started && !motion.matches && !paused) start();
        else schedule();
      }, { threshold: [0, .25] });
      observer.observe(phoneDemo.querySelector('.customer-phone'));
    } else {
      inView = true;
    }
  }

  const dialog = document.querySelector('#customer-image-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const viewport = dialog.querySelector('.customer-viewer__viewport');
  const sizeButton = dialog.querySelector('[data-viewer-size]');
  const status = dialog.querySelector('[role="status"]');
  let trigger = null;
  let previousOverflow = '';
  const resetSize = () => {
    dialog.classList.remove('customer-viewer--actual');
    sizeButton.setAttribute('aria-pressed', 'false');
    sizeButton.textContent = 'Actual size';
    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  };
  image.addEventListener('load', () => {
    image.style.setProperty('--source-width', image.naturalWidth + 'px');
    sizeButton.disabled = false;
    status.textContent = image.naturalWidth + ' x ' + image.naturalHeight + ' source pixels';
  });
  image.addEventListener('error', () => {
    sizeButton.disabled = true;
    status.textContent = 'This image could not be loaded. Close the viewer and try again.';
  });
  root.querySelectorAll('[data-image-viewer]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      trigger = link;
      resetSize();
      sizeButton.disabled = true;
      status.textContent = 'Loading image...';
      dialog.querySelector('h2').textContent = link.dataset.viewerTitle;
      image.alt = link.dataset.viewerTitle;
      image.src = link.href;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.querySelector('[data-viewer-close]').focus();
    });
  });
  sizeButton.addEventListener('click', () => {
    const actual = dialog.classList.toggle('customer-viewer--actual');
    sizeButton.setAttribute('aria-pressed', String(actual));
    sizeButton.textContent = actual ? 'Fit image' : 'Actual size';
  });
  dialog.querySelector('[data-viewer-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; trigger?.focus(); });
})();