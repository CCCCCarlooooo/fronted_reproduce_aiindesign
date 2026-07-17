/* ============ AI in Design Report 2026 — replica behaviour ============ */
/* Classic script (no modules) so the page runs from file:// directly.    */

(function () {
  'use strict';

  var hasGSAP = typeof gsap !== 'undefined';
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- 1. Loader (never blocks: window load OR 2.6s timeout) ---------- */
  var loader = document.getElementById('loader');
  var loaderDone = false;

  function hideLoader() {
    if (loaderDone || !loader) return;
    loaderDone = true;
    if (hasGSAP) {
      gsap.to(loader, {
        yPercent: -100, duration: 0.7, ease: 'power3.inOut',
        onComplete: function () { loader.style.display = 'none'; }
      });
      playHeroIntroAnimation();
    } else {
      loader.style.display = 'none';
    }
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, 350); });
  setTimeout(hideLoader, 2600); // hard fallback: fonts/media must not block first paint

  /* ---------- 2. Hero: intro video plays once, then crossfade to loop ---------- */
  var heroIntro = document.getElementById('hero-intro');
  var heroLoop = document.getElementById('hero-loop');

  function startLoop() {
    if (!heroLoop) return;
    heroLoop.classList.add('active');
    var p = heroLoop.play();
    if (p && p.catch) p.catch(function () { /* poster stays visible */ });
  }
  if (heroIntro) {
    heroIntro.addEventListener('ended', startLoop);
    heroIntro.addEventListener('error', startLoop);
    // if autoplay was blocked or the file stalls, fall back to the loop/poster
    setTimeout(function () {
      if (heroIntro.paused && heroIntro.currentTime === 0) startLoop();
    }, 2500);
  } else {
    startLoop();
  }

  /* ---------- 3. Hero entrance (runs after loader, not scroll-driven) ---------- */
  function playHeroIntroAnimation() {
    if (!hasGSAP) return;
    var lines = document.querySelectorAll('[data-hero-line]');
    var tagline = document.querySelector('[data-hero-reveal]');
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(lines, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, 0.1)
      .fromTo(tagline, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.3)
      .fromTo('.hero-bottom', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.5);
  }

  /* ---------- 4. Scroll reveals (safe: initial state set from JS only) ---------- */
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
    });

    // Founders: photo parallax + stat panels sliding in from the right
    gsap.fromTo('.founders-media img',
      { scale: 1.08 },
      {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: '#founders', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    document.querySelectorAll('[data-panel]').forEach(function (panel, i) {
      gsap.fromTo(panel,
        { x: 90, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '#founders', start: 'top 55%', toggleActions: 'play none none none' }
        });
    });

    // Quote: large quote line reveal
    gsap.fromTo('.quote-mark, .quote-person',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '#quote', start: 'top 70%', toggleActions: 'play none none none' }
      });

    // Chapters: content of each slide eases up as the slide covers the previous one
    document.querySelectorAll('[data-chapter]').forEach(function (ch) {
      var inner = ch.querySelector('.chapter-inner');
      gsap.fromTo(inner,
        { y: 70 },
        {
          y: 0, ease: 'none',
          scrollTrigger: { trigger: ch, start: 'top bottom', end: 'top top', scrub: true }
        });
    });

    // Footer giant wordmark + year: rise into view as footer scrolls in
    gsap.fromTo('#giant-wordmark',
      { yPercent: 55 },
      {
        yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: '.wordmark', start: 'top bottom', end: 'top 45%', scrub: true }
      });
    gsap.fromTo('#giant-year',
      { y: 120, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-links', start: 'top 80%', toggleActions: 'play none none none' }
      });
  }

  /* ---------- 4b. Header: hide on scroll down, reveal on scroll up ---------- */
  var header = document.getElementById('site-header');
  var lastScrollY = window.scrollY;
  window.addEventListener('scroll', function () {
    if (!header) return;
    var y = window.scrollY;
    if (y > lastScrollY + 6 && y > 120 && !menuOpen) {
      header.classList.add('header-hidden');
    } else if (y < lastScrollY - 6 || y <= 120) {
      header.classList.remove('header-hidden');
    }
    lastScrollY = y;
  }, { passive: true });

  /* ---------- 5. Case Studies fullscreen menu ---------- */
  var casesMenu = document.getElementById('cases-menu');
  var casesTrigger = document.getElementById('cases-trigger');
  var casesClose = document.getElementById('cases-close');
  var menuOpen = false;

  function openMenu() {
    if (menuOpen || !casesMenu) return;
    menuOpen = true;
    document.body.classList.add('menu-open');
    casesMenu.style.visibility = 'visible';
    if (hasGSAP) {
      gsap.killTweensOf([casesMenu, '#cases-menu .menu-row']);
      gsap.fromTo(casesMenu, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      gsap.fromTo('#cases-menu .menu-row', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.1, ease: 'power2.out' });
    } else {
      casesMenu.style.opacity = '1';
    }
    var closeBtn = document.getElementById('cases-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeMenu() {
    if (!menuOpen || !casesMenu) return;
    menuOpen = false;
    document.body.classList.remove('menu-open');
    if (hasGSAP) {
      gsap.killTweensOf([casesMenu, '#cases-menu .menu-row']);
      gsap.to(casesMenu, {
        opacity: 0, y: -20, duration: 0.35, ease: 'power2.in',
        onComplete: function () { if (!menuOpen) casesMenu.style.visibility = 'hidden'; }
      });
    } else {
      casesMenu.style.opacity = '0';
      casesMenu.style.visibility = 'hidden';
    }
    if (casesTrigger) casesTrigger.focus();
  }
  if (casesTrigger) casesTrigger.addEventListener('click', openMenu);
  if (casesClose) casesClose.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- 6. Carousel: arrows + pointer drag ---------- */
  var track = document.getElementById('carousel');
  var prevBtn = document.getElementById('car-prev');
  var nextBtn = document.getElementById('car-next');
  var CARD_STEP = 476; // card width 460 + gap 16

  function updateArrows() {
    if (!track || !prevBtn || !nextBtn) return;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  }
  if (track) {
    if (prevBtn) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -CARD_STEP, behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { track.scrollBy({ left: CARD_STEP, behavior: 'smooth' }); });
    track.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    // pointer drag-to-scroll; suppress the click that would follow a real drag
    var dragging = false, dragMoved = false, startX = 0, startScroll = 0;
    track.addEventListener('pointerdown', function (e) {
      dragging = true; dragMoved = false;
      startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) dragMoved = true;
      track.scrollLeft = startScroll - dx;
    });
    function endDrag() {
      dragging = false;
      track.classList.remove('dragging');
    }
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    track.addEventListener('click', function (e) {
      if (dragMoved) { e.preventDefault(); e.stopPropagation(); dragMoved = false; }
    }, true);
  }

  /* ---------- 7. Native canvas mouse particle trail ---------- */
  var canvas = document.getElementById('fx-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var MAX_PARTICLES = 130;
    var PALETTE = [
      [254, 113, 65],   // orange
      [205, 171, 254],  // lilac
      [163, 196, 170],  // deep sage (reads on white better than #D1DDD3)
      [244, 154, 194]   // thermal pink from the hero collage
    ];
    var colorIndex = 0;
    var lastX = null, lastY = null;

    function resizeCanvas() {
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resizeCanvas();
    var canvasResizeScheduled = false;
    window.addEventListener('resize', function () {
      if (canvasResizeScheduled) return;
      canvasResizeScheduled = true;
      requestAnimationFrame(function () { resizeCanvas(); canvasResizeScheduled = false; });
    });

    function spawn(x, y, speed) {
      colorIndex = (colorIndex + 1) % PALETTE.length;
      var c = PALETTE[colorIndex];
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7 - 0.15,
        r: 7 + Math.random() * 11 + Math.min(speed * 0.35, 14),
        life: 1,
        decay: 0.016 + Math.random() * 0.012,
        c: c
      });
      ensureTicking();
    }

    window.addEventListener('pointermove', function (e) {
      var speed = 0;
      if (lastX !== null) {
        speed = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      }
      lastX = e.clientX; lastY = e.clientY;
      var count = speed > 22 ? 3 : speed > 8 ? 2 : 1;
      for (var i = 0; i < count; i++) spawn(e.clientX, e.clientY, speed);
    }, { passive: true });

    /* rAF loop only runs while particles are alive (battery/CPU friendly) */
    var ticking = false;
    function ensureTicking() {
      if (!ticking && !document.hidden) {
        ticking = true;
        requestAnimationFrame(tick);
      }
    }
    function clearCanvas() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function tick() {
      clearCanvas();
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.x += p.vx;
        p.y += p.vy;
        var alpha = 0.34 * p.life;
        var radius = p.r * (0.35 + 0.65 * p.life);
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        g.addColorStop(0, 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + alpha + ')');
        g.addColorStop(1, 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (particles.length > 0 && !document.hidden) {
        requestAnimationFrame(tick);
      } else {
        ticking = false;
        clearCanvas();
      }
    }
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && particles.length > 0) ensureTicking();
    });
  }

  /* ---------- 8. Giant footer wordmark: fit to container width ---------- */
  var wordmark = document.getElementById('giant-wordmark');
  function fitWordmark() {
    if (!wordmark || !wordmark.parentElement) return;
    var target = wordmark.parentElement.clientWidth - 4;
    var size = 270;
    wordmark.style.fontSize = size + 'px';
    var w = wordmark.scrollWidth;
    if (w > 0) {
      size = Math.floor(size * target / w);
      wordmark.style.fontSize = size + 'px';
    }
  }
  fitWordmark();
  var wmResizeScheduled = false;
  window.addEventListener('resize', function () {
    if (wmResizeScheduled) return;
    wmResizeScheduled = true;
    requestAnimationFrame(function () { fitWordmark(); wmResizeScheduled = false; });
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitWordmark);
  } else {
    window.addEventListener('load', fitWordmark);
  }

  /* ---------- 9. Chapter videos: pause offscreen (perf) ---------- */
  if ('IntersectionObserver' in window) {
    var vids = document.querySelectorAll('.chapter-media video, .soon-video video');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.05 });
    vids.forEach(function (v) { io.observe(v); });
  }

})();
