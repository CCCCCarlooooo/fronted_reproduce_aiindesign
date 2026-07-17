/* ============ AI in Design Report 2026 — reproduction logic ============ */
(function () {
  'use strict';

  /* ---------- Video fallback (delegated, capture-phase: error doesn't bubble) ---------- */
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'VIDEO') e.target.style.display = 'none';
  }, true);

  /* ---------- Loader: hide on load, with hard timeout fallback ---------- */
  var loader = document.getElementById('loader');
  var loaderDone = false;
  function hideLoader() {
    if (loaderDone || !loader) return;
    loaderDone = true;
    loader.classList.add('done');
    if (!window.gsap) {
      // GSAP CDN failed: make hero content visible without animation
      var hero = document.querySelectorAll('.hero-title, .hero-tagline, .hero-bottom');
      hero.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
    }
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, 400); });
  setTimeout(hideLoader, 3000); // fallback: never block the first screen

  /* ---------- Native Canvas mouse particle trail (vanilla JS) ---------- */
  var canvas = document.getElementById('trail');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -100, y: -100, px: -100, py: -100 };
  var TRAIL_COLORS = ['#FE7141', '#CDABFE', '#D1DDD3'];
  var rafId = null;

  function resizeCanvas() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  });

  window.addEventListener('mousemove', function (e) {
    mouse.px = mouse.x; mouse.py = mouse.y;
    mouse.x = e.clientX; mouse.y = e.clientY;
    var dx = mouse.x - mouse.px;
    var dy = mouse.y - mouse.py;
    var speed = Math.sqrt(dx * dx + dy * dy);
    var n = Math.min(4, Math.max(1, Math.floor(speed / 12)));
    for (var i = 0; i < n; i++) {
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 6,
        y: mouse.y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.3,
        life: 1,
        decay: 0.02 + Math.random() * 0.025,
        size: 1.5 + Math.random() * 3,
        color: TRAIL_COLORS[(Math.random() * TRAIL_COLORS.length) | 0]
      });
    }
    if (particles.length > 220) particles.splice(0, particles.length - 220);
    if (!rafId) rafId = requestAnimationFrame(tickTrail);
  });

  function tickTrail() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life * 0.85;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // pause the loop when idle; mousemove restarts it
    rafId = particles.length ? requestAnimationFrame(tickTrail) : null;
  }

  /* ---------- Nav: hide on scroll down, show on scroll up ---------- */
  var nav = document.getElementById('nav');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 120 && y > lastY) {
      nav.classList.add('hidden-nav');
      closeDropdowns();
    } else {
      nav.classList.remove('hidden-nav');
    }
    lastY = y;
  }, { passive: true });

  /* ---------- Nav dropdowns ---------- */
  var dropdowns = document.querySelectorAll('.nav-dd');
  function closeDropdowns() {
    dropdowns.forEach(function (d) { d.classList.remove('open'); });
  }
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector('.nav-btn');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      closeDropdowns();
      if (!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', closeDropdowns);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdowns();
  });

  /* ---------- Case studies carousel arrows ---------- */
  var track = document.getElementById('casesTrack');
  var prev = document.getElementById('casePrev');
  var next = document.getElementById('caseNext');
  function cardStep() {
    var card = track.querySelector('.case-card');
    return card ? card.getBoundingClientRect().width + 16 : 476;
  }
  prev.addEventListener('click', function () {
    track.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });
  next.addEventListener('click', function () {
    track.scrollBy({ left: cardStep(), behavior: 'smooth' });
  });
  function updateArrows() {
    var max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  }
  track.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  /* ---------- Subscribe form: no backend, acknowledge locally ---------- */
  var form = document.getElementById('subForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.sub-btn');
    btn.textContent = 'Submitted ✓';
    setTimeout(function () { btn.textContent = 'Submit'; form.reset(); }, 2200);
  });

  /* ---------- GSAP scroll narrative ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Generic reveals: fade + rise, never stuck hidden at progress 0
    document.querySelectorAll('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
    });

    // Hero intro: title + tagline slide in after loader
    gsap.fromTo('.hero-title',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.5 });
    gsap.fromTo('.hero-tagline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 });
    gsap.fromTo('.hero-bottom',
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.9 });

    // Stats photo parallax inside sticky container
    gsap.fromTo('.stats-photo img',
      { yPercent: -12 },
      {
        yPercent: 0, ease: 'none',
        scrollTrigger: {
          trigger: '#stats',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    // Count-up numbers (900+, 25+, 906, 50+ ...)
    document.querySelectorAll('.count').forEach(function (el) {
      var to = parseInt(el.getAttribute('data-to'), 10) || 0;
      var obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: function () { el.textContent = Math.round(obj.v); }
      });
    });

    // Chapter inner content entrance per sticky panel
    document.querySelectorAll('.chapter').forEach(function (ch) {
      var items = ch.querySelectorAll('.ch-left, .ch-right, .ch-media, .ch-list');
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: ch, start: 'top 65%', once: true }
        });
    });

    // Case cards stagger in
    gsap.fromTo('.case-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '#casesTrack', start: 'top 85%', once: true }
      });

    // Footer giant wordmark rise
    gsap.fromTo('.foot-word',
      { yPercent: 30, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#footer', start: 'top 80%', once: true }
      });
  }

  /* ---------- Video autoplay: tolerate blocked play() promises ---------- */
  document.querySelectorAll('video').forEach(function (v) {
    var p = v.play ? v.play() : null;
    if (p && p.catch) p.catch(function () { /* autoplay blocked: poster stays */ });
  });
})();
