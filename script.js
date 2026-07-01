/* ============================================
   APEXIAR — Shared Site Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    let lastFocusedElement = null;

    const getFocusableNavElements = () => Array.from(
      mobileNav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );

    const openMobileNav = () => {
      lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      hamburger.classList.add('active');
      mobileNav.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const [firstFocusableElement] = getFocusableNavElements();
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    };

    const closeMobileNav = () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    };

    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        closeMobileNav();
        return;
      }

      openMobileNav();
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (!hamburger.classList.contains('active')) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileNav();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableNavElements();
      if (focusableElements.length === 0) {
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    });
  }

  // --- Navbar background on scroll ---
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        navbar.style.background = 'rgba(10,10,15,0.85)';
        navbar.style.backdropFilter = 'blur(12px)';
        navbar.style.webkitBackdropFilter = 'blur(12px)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.webkitBackdropFilter = 'none';
      }
    }, { passive: true });
  }

  // --- Scroll-triggered fade-in animations ---
  const animateElements = () => {
    // Select elements to animate
    const selectors = [
      '.feature-card',
      '.step',
      '.cta-section__inner',
      '.section-title',
      '.section-subtitle',
      '.bento__card',
      '.ecosystem__card',
      '.about__stat',
      '.showcase-bento__card',
      '.expertise__item'
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('fade-in')) {
          el.classList.add('fade-in');
        }
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  };

  animateElements();

  // --- Mark decorative SVGs as aria-hidden ---
  document.querySelectorAll('.feature-card__icon svg, .ecosystem__card-icon svg, .bento__bell-icon svg').forEach(svg => {
    svg.setAttribute('aria-hidden', 'true');
  });

  // --- Stagger animation for feature cards ---
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- Stagger animation for bento cards ---
  const bentoCards = document.querySelectorAll('.bento__card');
  bentoCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.15}s`;
  });

  // --- Stagger animation for ecosystem cards ---
  const ecoCards = document.querySelectorAll('.ecosystem__card');
  ecoCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- Stagger animation for showcase bento cards ---
  const showcaseBentoCards = document.querySelectorAll('.showcase-bento__card');
  showcaseBentoCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });

  // --- Stagger animation for about stats ---
  const aboutStats = document.querySelectorAll('.about__stat');
  aboutStats.forEach((stat, i) => {
    stat.style.transitionDelay = `${i * 0.1}s`;
  });

  // --- Stagger animation for expertise pillars ---
  const expertiseItems = document.querySelectorAll('.expertise__item');
  expertiseItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });

  // --- About stats counter animation ---
  const aboutStatsSection = document.querySelector('.about__stats');
  const counterElements = aboutStatsSection
    ? Array.from(aboutStatsSection.querySelectorAll('[data-counter-end]'))
    : [];

  if (aboutStatsSection && counterElements.length > 0) {
    let countersStarted = false;

    const runCounters = () => {
      const counterDurationMs = 1800;
      const counterTargets = counterElements.map((element) => ({
        element,
        endValue: Number(element.dataset.counterEnd || '0'),
        suffix: element.dataset.counterSuffix || ''
      }));
      const startTime = performance.now();

      const updateCounters = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / counterDurationMs, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        counterTargets.forEach(({ element, endValue, suffix }) => {
          const currentValue = Math.round(endValue * easedProgress);
          element.textContent = `${currentValue}${suffix}`;
        });

        if (progress < 1) {
          window.requestAnimationFrame(updateCounters);
        }
      };

      window.requestAnimationFrame(updateCounters);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || countersStarted) {
          return;
        }

        countersStarted = true;
        runCounters();
        counterObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.3
    });

    counterObserver.observe(aboutStatsSection);
  }

  // --- Globe constellation dots ---
  (function initGlobeDots() {
    const globe = document.querySelector('.expertise__globe');
    const canvas = document.querySelector('.expertise__globe-dots');
    if (!globe || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;

    function buildParticles(W, H) {
      const cx = W / 2, cy = H / 2;
      const rx = W / 2, ry = H / 2;
      particles = [];
      // Dot count scales with globe width; cap for performance
      const count = Math.min(90, Math.floor(W / 18));
      for (let i = 0; i < count; i++) {
        // Distribute across top 55% of ellipse arc (-π → 0 = full top half)
        const angle = -Math.PI + Math.random() * Math.PI;
        // Depth from rim inward: 0 = on the rim, 1 = at center
        const depth = 0.08 + Math.random() * 0.55;
        const x = cx + rx * Math.cos(angle) * (1 - depth);
        const y = cy + ry * Math.sin(angle) * (1 - depth);
        particles.push({
          x, y,
          r: 0.7 + Math.random() * 1.8,
          baseAlpha: 0.2 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          speed: 0.25 + Math.random() * 0.65,
          bright: Math.random() > 0.78  // ~22% are brighter anchor dots
        });
      }
    }

    function resize() {
      const W = globe.offsetWidth;
      const H = globe.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      buildParticles(W, H);
    }

    let t = 0;
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.007;

      // Blue constellation lines between nearby gold dots
      ctx.lineWidth = 0.85;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 105) {
            ctx.strokeStyle = `rgba(49,200,255,${((1 - dist / 105) * 0.2).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        const alpha = p.baseAlpha * (0.45 + 0.55 * Math.sin(t * p.speed + p.phase));
        const r = p.r;

        if (p.bright) {
          // Soft gold outer glow for accent dots
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
          grd.addColorStop(0, `rgba(232,160,32,${(alpha * 0.58).toFixed(3)})`);
          grd.addColorStop(1, 'rgba(232,160,32,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.bright ? '255,205,90' : '232,160,32'},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function stop()  { if (animId) { cancelAnimationFrame(animId); animId = null; } }
    function start() { if (!animId) draw(); }

    // Pause animation when the section scrolls off-screen
    const sectionObs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    sectionObs.observe(globe);

    // Re-build when globe resizes (responsive)
    const ro = new ResizeObserver(resize);
    ro.observe(globe);

    resize();
    start();
  })();

  // --- Smooth scroll for anchor links (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Video reel text slide sync ---
  const reelVideo = document.querySelector('.video-reel__bg');
  const reelSlides = document.querySelectorAll('.video-reel__slide');

  if (reelVideo && reelSlides.length > 0) {
    // [start, end] in seconds for each slide
    const slideRanges = [[0.5, 5], [6, 11.5], [12, 17.5]];
    let currentSlide = -1;

    reelVideo.addEventListener('timeupdate', () => {
      const t = reelVideo.currentTime;
      let activeSlide = -1;

      for (let i = 0; i < slideRanges.length; i++) {
        if (t >= slideRanges[i][0] && t <= slideRanges[i][1]) {
          activeSlide = i;
          break;
        }
      }

      if (activeSlide !== currentSlide) {
        reelSlides.forEach(s => s.classList.remove('video-reel__slide--active'));
        if (activeSlide >= 0) {
          reelSlides[activeSlide].classList.add('video-reel__slide--active');
        }
        currentSlide = activeSlide;
      }
    });
  }

  // --- Subtle parallax on hero glow ---
  const heroGlow = document.querySelector('.hero__glow');
  const heroVortex = document.querySelector('.hero__vortex');

  if (heroGlow && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      heroGlow.style.setProperty('--hero-glow-offset-x', `${x}px`);
      heroGlow.style.setProperty('--hero-glow-offset-y', `${y}px`);
      if (heroVortex) {
        heroVortex.style.setProperty('--hero-vortex-offset-x', `${x * 0.5}px`);
      }
    }, { passive: true });
  }

  // --- Reusable Particle System ---
  const createParticleSystem = (container, options = {}) => {
    if (!container) return;

    const {
      maxParticles = 60,
      spawnInterval = [80, 200],  // [min, range] ms
      initialBurst = 40,
      burstDelay = 60,
      sizeRange = [1.5, 4],
      durationRange = [5, 7],
      delayRange = [0, 1.5],
      bottomRange = [0, 50],
      colors = ['#F5C242', '#B8860B', '#CD7F32', '#E8922F', '#FFD666', '#FBBF24']
    } = options;

    let activeParticles = 0;
    let spawnTimer = null;
    let paused = false;

    const createParticle = () => {
      if (paused || activeParticles >= maxParticles) return;

      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = Math.random() * bottomRange[1] + bottomRange[0] + '%';

      const size = Math.random() * sizeRange[1] + sizeRange[0];
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      const duration = Math.random() * durationRange[1] + durationRange[0];
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = Math.random() * delayRange[1] + delayRange[0] + 's';

      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;

      container.appendChild(particle);
      activeParticles++;

      setTimeout(() => {
        particle.remove();
        activeParticles--;
      }, (duration + delayRange[1] + 1) * 1000);
    };

    const spawnLoop = () => {
      createParticle();
      spawnTimer = setTimeout(spawnLoop, Math.random() * spawnInterval[1] + spawnInterval[0]);
    };

    // Pause when container is off-screen
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        paused = !entry.isIntersecting;
        if (!paused && !spawnTimer) spawnLoop();
        if (paused && spawnTimer) {
          clearTimeout(spawnTimer);
          spawnTimer = null;
        }
      });
    }, { threshold: 0 });

    visibilityObserver.observe(container.parentElement || container);

    // Start
    spawnLoop();

    // Initial burst
    for (let i = 0; i < initialBurst; i++) {
      setTimeout(createParticle, i * burstDelay);
    }
  };

  // --- Hero Particles ---
  createParticleSystem(document.getElementById('heroParticles'), {
    maxParticles: 60,
    spawnInterval: [80, 200],
    initialBurst: 40,
    burstDelay: 60,
    sizeRange: [1.5, 4],
    durationRange: [5, 7],
    bottomRange: [0, 50],
    colors: ['#f6feff', '#b9f3ff', '#63ddff', '#2cb9ff', '#245bff']
  });

  // --- Bento Showcase Particles ---
  createParticleSystem(document.getElementById('bentoParticles'), {
    maxParticles: 30,
    spawnInterval: [150, 350],
    initialBurst: 15,
    burstDelay: 120,
    sizeRange: [1, 3.5],
    durationRange: [6, 8],
    delayRange: [0, 2],
    bottomRange: [0, 30],
    colors: ['#F5C242', '#B8860B', '#CD7F32', '#E8922F', '#FFD666']
  });

  // --- Cursor-following glow on .glow-track elements ---
  document.querySelectorAll('.glow-track').forEach(el => {
    const light = document.createElement('div');
    light.className = 'glow-track__light';
    el.appendChild(light);

    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - 60;
      const y = e.clientY - rect.top - 60;
      light.style.left = x + 'px';
      light.style.top = y + 'px';
    });
  });
});
