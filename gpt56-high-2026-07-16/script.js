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
  var heroIntroFinished = false;

  function safePlay(video) {
    if (!video || document.hidden) return;
    var promise = video.play();
    if (promise && promise.catch) promise.catch(function () {});
  }

  function showMediaFallback(video) {
    if (!video) return;
    video.pause();
    var container = video.closest('.chapter-media, .soon-video');
    if (container) container.classList.add('media-failed');
  }

  document.querySelectorAll('.chapter-media video, .soon-video video').forEach(function (video) {
    video.addEventListener('error', function () { showMediaFallback(video); });
  });

  function startLoop() {
    if (!heroLoop) return;
    heroIntroFinished = true;
    var p = heroLoop.play();
    if (p && p.then) {
      p.then(function () { heroLoop.classList.add('active'); })
        .catch(function () { heroLoop.classList.remove('active'); });
    } else {
      heroLoop.classList.add('active');
    }
  }
  if (heroIntro) {
    heroIntro.addEventListener('ended', startLoop);
    heroIntro.addEventListener('error', function () {
      heroIntro.style.display = 'none';
      startLoop();
    });
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

    document.querySelectorAll('.stat-number').forEach(function (element) {
      var target = parseInt(element.textContent, 10);
      var counter = { value: 0 };
      var hasPlus = element.querySelector('sup') !== null;
      element.innerHTML = '0' + (hasPlus ? '<sup>+</sup>' : '');
      gsap.to(counter, {
        value: target,
        duration: 2.55,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#founders', start: 'top 72%', once: true },
        onUpdate: function () {
          element.innerHTML = Math.floor(counter.value) + (hasPlus ? '<sup>+</sup>' : '');
        },
        onComplete: function () {
          element.innerHTML = target + (hasPlus ? '<sup>+</sup>' : '');
        }
      });
    });

    // Quote: large quote line reveal
    gsap.fromTo('.quote-mark, .quote-person',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '#quote', start: 'top 70%' }
      });

    // Chapters: content of each slide eases up as the slide covers the previous one
    document.querySelectorAll('[data-chapter]').forEach(function (ch) {
      var inner = ch.querySelector('.chapter-inner');
      gsap.fromTo(inner,
        { yPercent: -100 },
        {
          yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: ch, start: 'top bottom', end: 'top top', scrub: true }
        });

      var nextChapter = ch.nextElementSibling;
      if (nextChapter && nextChapter.matches('[data-chapter]')) {
        var isToolsChapter = ch.classList.contains('chapter-tools');
        gsap.to(inner, {
          y: isToolsChapter ? -860 : -950,
          ease: isToolsChapter ? 'none' : 'power1.in',
          scrollTrigger: { trigger: nextChapter, start: 'top bottom', end: 'top top', scrub: true }
        });
      }
    });

    // Footer giant wordmark + year: rise into view as footer scrolls in
    gsap.fromTo('#giant-wordmark',
      { clipPath: 'inset(55% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.wordmark', start: 'top bottom', end: 'top 45%', scrub: true }
      });
    gsap.fromTo('#giant-year',
      { clipPath: 'inset(55% 0 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-links', start: 'top 80%' }
      });
  }

  /* ---------- 5. Header menus ---------- */
  var reportMenu = document.getElementById('report-menu');
  var reportTrigger = document.getElementById('read-report-pill');
  var reportClose = document.getElementById('report-close');
  var reportOpen = false;

  function openReportMenu(event) {
    if (event) event.preventDefault();
    if (reportOpen || !reportMenu) return;
    if (menuOpen) closeMenu();
    reportOpen = true;
    document.body.classList.add('menu-open');
    reportMenu.setAttribute('aria-hidden', 'false');
    reportMenu.style.visibility = 'visible';
    if (hasGSAP) {
      gsap.fromTo(reportMenu, { xPercent: -100, opacity: 1 }, { xPercent: 0, opacity: 1, duration: .5, ease: 'power3.out' });
      gsap.fromTo('#report-menu .report-menu-links a', { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: .45, stagger: .06, delay: .12, ease: 'power2.out' });
    } else {
      reportMenu.style.opacity = '1';
      reportMenu.style.transform = 'translateX(0)';
    }
  }

  function closeReportMenu() {
    if (!reportOpen || !reportMenu) return;
    reportOpen = false;
    document.body.classList.remove('menu-open');
    reportMenu.setAttribute('aria-hidden', 'true');
    if (hasGSAP) {
      gsap.to(reportMenu, {
        xPercent: -100, duration: .38, ease: 'power3.in',
        onComplete: function () { reportMenu.style.visibility = 'hidden'; }
      });
    } else {
      reportMenu.style.opacity = '0';
      reportMenu.style.visibility = 'hidden';
    }
  }

  var casesMenu = document.getElementById('cases-menu');
  var casesTrigger = document.getElementById('cases-trigger');
  var casesClose = document.getElementById('cases-close');
  var menuOpen = false;

  function openMenu() {
    if (menuOpen || !casesMenu) return;
    if (reportOpen) closeReportMenu();
    menuOpen = true;
    document.body.classList.add('menu-open');
    casesMenu.setAttribute('aria-hidden', 'false');
    casesMenu.style.visibility = 'visible';
    if (hasGSAP) {
      gsap.fromTo(casesMenu, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      gsap.fromTo('#cases-menu .menu-row', { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.1, ease: 'power2.out' });
    } else {
      casesMenu.style.opacity = '1';
    }
  }
  function closeMenu() {
    if (!menuOpen || !casesMenu) return;
    menuOpen = false;
    document.body.classList.remove('menu-open');
    casesMenu.setAttribute('aria-hidden', 'true');
    if (hasGSAP) {
      gsap.to(casesMenu, {
        opacity: 0, y: -20, duration: 0.35, ease: 'power2.in',
        onComplete: function () { casesMenu.style.visibility = 'hidden'; }
      });
    } else {
      casesMenu.style.opacity = '0';
      casesMenu.style.visibility = 'hidden';
    }
  }
  if (casesTrigger) casesTrigger.addEventListener('click', openMenu);
  if (casesClose) casesClose.addEventListener('click', closeMenu);
  if (reportTrigger) reportTrigger.addEventListener('click', openReportMenu);
  if (reportClose) reportClose.addEventListener('click', closeReportMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeReportMenu();
    }
  });

  /* ---------- 6. Carousel: arrows + pointer drag ---------- */
  var track = document.getElementById('carousel');
  var prevBtn = document.getElementById('car-prev');
  var nextBtn = document.getElementById('car-next');
  var CARD_STEP = 476; // card width 460 + gap 16

  function getCardStep() {
    if (!track) return CARD_STEP;
    var card = track.querySelector('.case-card');
    if (!card) return CARD_STEP;
    var gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function updateArrows() {
    if (!track || !prevBtn || !nextBtn) return;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  }
  if (track) {
    if (prevBtn) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -getCardStep(), behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { track.scrollBy({ left: getCardStep(), behavior: 'smooth' }); });
    track.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    // pointer drag-to-scroll; suppress the click that would follow a real drag
    var dragging = false, dragMoved = false, startX = 0, startScroll = 0;
    var activePointer = null;
    track.addEventListener('pointerdown', function (e) {
      dragging = true; dragMoved = false;
      activePointer = e.pointerId;
      startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function (e) {
      if (!dragging || e.pointerId !== activePointer) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) dragMoved = true;
      track.scrollLeft = startScroll - dx;
    });
    function endDrag(e) {
      if (activePointer !== null && e.pointerId !== activePointer) return;
      dragging = false;
      activePointer = null;
      track.classList.remove('dragging');
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('lostpointercapture', endDrag);
    track.addEventListener('click', function (e) {
      if (dragMoved) { e.preventDefault(); e.stopPropagation(); dragMoved = false; }
    }, true);
  }

  /* ---------- 7. Native canvas mouse particle trail ---------- */
  var canvas = document.getElementById('fx-canvas');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var DPR = 1;
    var particles = [];
    var animationFrame = null;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * DPR);
      canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function spawn(x, y, speed) {
      colorIndex = (colorIndex + 1) % PALETTE.length;
      var c = PALETTE[colorIndex];
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
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    }

    window.addEventListener('pointermove', function (e) {
      if (reduceMotion || document.hidden) return;
      var speed = 0;
      if (lastX !== null) {
        speed = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      }
      lastX = e.clientX; lastY = e.clientY;
      var count = speed > 22 ? 3 : speed > 8 ? 2 : 1;
      for (var i = 0; i < count; i++) spawn(e.clientX, e.clientY, speed);
      if (animationFrame === null) animationFrame = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
      ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
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
      animationFrame = particles.length ? requestAnimationFrame(tick) : null;
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        particles.length = 0;
        if (animationFrame !== null) cancelAnimationFrame(animationFrame);
        animationFrame = null;
        ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
      }
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
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }
  fitWordmark();
  window.addEventListener('resize', fitWordmark);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitWordmark);
  } else {
    window.addEventListener('load', fitWordmark);
  }

  /* ---------- 9. Scene-aware video lifecycle ---------- */
  var managedVideos = Array.prototype.slice.call(document.querySelectorAll('video'));
  var videoUpdateFrame = null;

  function pauseExcept(activeVideo) {
    managedVideos.forEach(function (video) {
      if (video !== activeVideo && video !== heroIntro && !video.paused) video.pause();
    });
    if (heroIntro && activeVideo !== heroIntro && !heroIntro.paused) heroIntro.pause();
    safePlay(activeVideo);
  }

  function activeSceneVideo() {
    if (document.hidden) return null;
    var viewportHeight = window.innerHeight;
    var soon = document.querySelector('.soon-video video');
    var soonRect = soon ? soon.closest('#coming-soon').getBoundingClientRect() : null;
    if (soonRect && soonRect.top < viewportHeight * 0.8 && soonRect.bottom > viewportHeight * 0.2) return soon;

    var activeChapter = null;
    document.querySelectorAll('[data-chapter]').forEach(function (chapter) {
      var rect = chapter.getBoundingClientRect();
      if (rect.top <= viewportHeight * 0.5 && rect.bottom > 0) activeChapter = chapter.querySelector('video');
    });
    if (activeChapter) return activeChapter;

    var heroRect = document.getElementById('hero').getBoundingClientRect();
    if (heroRect.bottom > 0 && heroRect.top < viewportHeight) {
      return heroIntroFinished ? heroLoop : heroIntro;
    }
    return null;
  }

  function updateActiveVideo() {
    videoUpdateFrame = null;
    pauseExcept(activeSceneVideo());
  }

  function requestVideoUpdate() {
    if (videoUpdateFrame === null) videoUpdateFrame = requestAnimationFrame(updateActiveVideo);
  }

  window.addEventListener('scroll', requestVideoUpdate, { passive: true });
  window.addEventListener('resize', requestVideoUpdate);
  document.addEventListener('visibilitychange', requestVideoUpdate);
  requestVideoUpdate();

})();
