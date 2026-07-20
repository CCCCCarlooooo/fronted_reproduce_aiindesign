/* ═══════════════════════════════════════════════════════
   Machine Craft Report 2026 — interactions & scroll story
   Vanilla JS + native Canvas + GSAP 3 / ScrollTrigger (CDN)
   Runs from file:// — classic script, no modules.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────
     1 · Preloader — never blocks first paint.
     Ends on window load OR a 2.5s hard timeout.
  ───────────────────────────────────────────── */
  var preloader = document.getElementById('preloader');
  var preFill = document.getElementById('pre-bar-fill');
  var preDone = false;
  var preProgress = 0;
  var preTick = setInterval(function () {
    preProgress = Math.min(preProgress + Math.random() * 22, 92);
    if (preFill) preFill.style.width = preProgress + '%';
  }, 180);

  function finishPreloader() {
    if (preDone) return;
    preDone = true;
    clearInterval(preTick);
    if (preFill) preFill.style.width = '100%';
    preloader.style.pointerEvents = 'none'; // never block clicks while fading
    setTimeout(function () {
      preloader.classList.add('done');
      // wait for most of the 0.6s fade so the intro isn't hidden behind it
      setTimeout(playHeroIntro, 450);
    }, 200);
  }
  window.addEventListener('load', finishPreloader);
  setTimeout(finishPreloader, 2500); // hard fallback: fonts/images must not block

  /* ─────────────────────────────────────────────
     2 · Hero collage — native canvas ink field.
     Slow-drifting organic gradient blobs, mouse
     attracts/disturbs them and seeds ink spots.
  ───────────────────────────────────────────── */
  var heroCanvas = document.getElementById('hero-canvas');
  var heroBanner = document.getElementById('hero-banner');
  var hctx = heroCanvas.getContext('2d');
  var heroW = 0, heroH = 0;
  var heroMouse = { x: -9999, y: -9999, vx: 0, px: -9999, py: -9999 };
  var blobs = [];
  var inkSpots = [];
  var heroPalette = [
    ['#5d6a55', '#2f382c'], // moss
    ['#cdabfe', '#8f6cd9'], // lavender
    ['#fe7141', '#c74a22'], // orange
    ['#e9e6df', '#b9beb2'], // bone
    ['#46503f', '#232a1f'], // deep moss
    ['#f3c9b8', '#d98b6b']  // flesh pink
  ];

  function sizeHero() {
    heroW = heroBanner.clientWidth;
    heroH = heroBanner.clientHeight;
    heroCanvas.width = heroW * DPR;
    heroCanvas.height = heroH * DPR;
    hctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  var photoCards = [];

  function seedBlobs() {
    blobs = [];
    // dark organic silhouettes (petal-like lobed shapes) + bright accents
    var n = 16;
    for (var i = 0; i < n; i++) {
      var dark = i % 3 !== 1; // 2/3 dark forms, 1/3 bright accents
      var pal = dark
        ? [['#2c331f', '#171c10'], ['#3d4630', '#1e2416'], ['#565f49', '#242b19']][i % 3 === 0 ? 0 : (i % 2)]
        : heroPalette[1 + (i % 4)];
      blobs.push({
        x: Math.random() * heroW,
        y: Math.random() * heroH,
        r: dark ? 170 + Math.random() * 300 : 90 + Math.random() * 170,
        c0: pal[0], c1: pal[1],
        a: dark ? 0.9 : 0.75 + Math.random() * 0.25,
        dark: dark,
        lobes: 3 + ((Math.random() * 3) | 0),
        rot: Math.random() * Math.PI * 2,
        t: Math.random() * Math.PI * 2,
        ts: 0.0014 + Math.random() * 0.0024,
        ax: 50 + Math.random() * 130,
        ay: 26 + Math.random() * 80,
        ox: 0, oy: 0
      });
    }
    // collage "photo cards" drifting like pinned snapshots
    photoCards = [];
    var cardPals = [['#f3d9f8', '#fe7141'], ['#e9e6df', '#b9beb2'], ['#cdabfe', '#7d5bbd'], ['#f0e6b8', '#c9a45c']];
    for (var k = 0; k < 4; k++) {
      photoCards.push({
        x: (0.08 + 0.24 * k) * heroW + Math.random() * 40,
        y: (k % 2 ? 0.12 : 0.5) * heroH + Math.random() * 40,
        w: 130 + Math.random() * 130,
        h: 90 + Math.random() * 70,
        c: cardPals[k % cardPals.length],
        t: Math.random() * Math.PI * 2,
        ts: 0.002 + Math.random() * 0.002,
        rot: (Math.random() - 0.5) * 0.05
      });
    }
  }

  function blobPath(bx, by, b) {
    // lobed organic silhouette instead of a plain circle
    hctx.beginPath();
    var steps = 26;
    for (var s = 0; s <= steps; s++) {
      var ang = (s / steps) * Math.PI * 2;
      var wob = 1 + 0.28 * Math.sin(ang * b.lobes + b.rot + b.t * 1.8);
      var rr = b.r * wob;
      var px = bx + Math.cos(ang) * rr;
      var py = by + Math.sin(ang) * rr * 0.72;
      if (s === 0) hctx.moveTo(px, py); else hctx.lineTo(px, py);
    }
    hctx.closePath();
  }

  function drawHero(now) {
    // deep moss base with a top-light gradient — cinematic footing
    var base = hctx.createLinearGradient(0, 0, 0, heroH);
    base.addColorStop(0, '#4a5340');
    base.addColorStop(0.55, '#39422f');
    base.addColorStop(1, '#252c1c');
    hctx.fillStyle = base;
    hctx.fillRect(0, 0, heroW, heroH);

    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      b.t += b.ts;
      var bx = b.x + Math.cos(b.t) * b.ax + b.ox;
      var by = b.y + Math.sin(b.t * 1.37) * b.ay + b.oy;
      // mouse attraction / disturbance
      var dx = heroMouse.x - bx, dy = heroMouse.y - by;
      var d2 = dx * dx + dy * dy;
      if (d2 < 340 * 340) {
        var f = (1 - Math.sqrt(d2) / 340) * 26;
        b.ox += (dx / (Math.sqrt(d2) + 1)) * f * 0.16;
        b.oy += (dy / (Math.sqrt(d2) + 1)) * f * 0.16;
      }
      b.ox *= 0.94; b.oy *= 0.94;

      if (b.dark) {
        // solid organic silhouette with soft inner grade
        var g = hctx.createRadialGradient(bx, by - b.r * 0.3, b.r * 0.1, bx, by, b.r * 1.15);
        g.addColorStop(0, hexA(b.c0, b.a));
        g.addColorStop(1, hexA(b.c1, b.a * 0.92));
        hctx.fillStyle = g;
        blobPath(bx, by, b);
        hctx.fill();
      } else {
        // bright accent glow layered with screen blending
        hctx.globalCompositeOperation = 'screen';
        var g2 = hctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        g2.addColorStop(0, hexA(b.c0, b.a * 0.9));
        g2.addColorStop(0.5, hexA(b.c1, b.a * 0.4));
        g2.addColorStop(1, hexA(b.c1, 0));
        hctx.fillStyle = g2;
        blobPath(bx, by, b);
        hctx.fill();
        hctx.globalCompositeOperation = 'source-over';
      }
    }

    // drifting collage snapshots (bright cards with thin borders)
    for (var c = 0; c < photoCards.length; c++) {
      var pc = photoCards[c];
      pc.t += pc.ts;
      var cx = pc.x + Math.cos(pc.t) * 14;
      var cy = pc.y + Math.sin(pc.t * 1.3) * 10;
      hctx.save();
      hctx.translate(cx, cy);
      hctx.rotate(pc.rot + Math.sin(pc.t) * 0.012);
      var cg = hctx.createLinearGradient(0, 0, pc.w, pc.h);
      cg.addColorStop(0, pc.c[0]);
      cg.addColorStop(1, pc.c[1]);
      hctx.globalAlpha = 0.92;
      hctx.fillStyle = cg;
      hctx.fillRect(-pc.w / 2, -pc.h / 2, pc.w, pc.h);
      hctx.globalAlpha = 1;
      hctx.strokeStyle = 'rgba(245,245,240,0.85)';
      hctx.lineWidth = 1.5;
      hctx.strokeRect(-pc.w / 2, -pc.h / 2, pc.w, pc.h);
      hctx.restore();
    }
    // ink spots left by the cursor
    for (var k = inkSpots.length - 1; k >= 0; k--) {
      var s = inkSpots[k];
      s.life -= 0.012;
      s.r += 0.55;
      if (s.life <= 0) { inkSpots.splice(k, 1); continue; }
      var ig = hctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
      ig.addColorStop(0, hexA(s.c, s.life * 0.5));
      ig.addColorStop(1, hexA(s.c, 0));
      hctx.fillStyle = ig;
      hctx.beginPath();
      hctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      hctx.fill();
    }
    // scanline shimmer, very subtle, sells the "footage" feel
    var band = ((now * 0.02) % (heroH + 240)) - 120;
    var lg = hctx.createLinearGradient(0, band - 90, 0, band + 90);
    lg.addColorStop(0, 'rgba(255,255,255,0)');
    lg.addColorStop(0.5, 'rgba(255,255,255,0.045)');
    lg.addColorStop(1, 'rgba(255,255,255,0)');
    hctx.fillStyle = lg;
    hctx.fillRect(0, band - 90, heroW, 180);
  }

  function hexA(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + Math.max(0, Math.min(1, a)) + ')';
  }

  var heroTags = null; // cached in boot()
  heroBanner.addEventListener('mousemove', function (e) {
    var rect = heroBanner.getBoundingClientRect();
    heroMouse.x = e.clientX - rect.left;
    heroMouse.y = e.clientY - rect.top;
    if (heroMouse.px > -999) {
      var sp = Math.abs(e.clientX - heroMouse.px) + Math.abs(e.clientY - heroMouse.py);
      if (sp > 3 && inkSpots.length < 30) {
        inkSpots.push({
          x: heroMouse.x, y: heroMouse.y, r: 6 + Math.random() * 10,
          c: ['#fe7141', '#cdabfe', '#f0ff1c', '#e9e6df'][(Math.random() * 4) | 0],
          life: 1
        });
      }
    }
    heroMouse.px = e.clientX; heroMouse.py = e.clientY;
    // parallax the floating tag chips (cached NodeList, no per-event query)
    if (!heroTags) heroTags = document.querySelectorAll('.hero-tag');
    for (var i = 0; i < heroTags.length; i++) {
      var depth = parseFloat(heroTags[i].getAttribute('data-depth')) || 0.5;
      var mx = (heroMouse.x / heroW - 0.5) * 26 * depth;
      var my = (heroMouse.y / heroH - 0.5) * 18 * depth;
      heroTags[i].style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    }
  });
  heroBanner.addEventListener('mouseleave', function () {
    heroMouse.x = -9999; heroMouse.y = -9999;
  });

  /* ─────────────────────────────────────────────
     3 · Global cursor ink trail (fixed canvas)
  ───────────────────────────────────────────── */
  var trailCanvas = document.getElementById('trail-canvas');
  var tctx = trailCanvas.getContext('2d');
  var trail = [];
  var trailColors = ['#fe7141', '#cdabfe', '#111111'];

  function sizeTrail() {
    trailCanvas.width = window.innerWidth * DPR;
    trailCanvas.height = window.innerHeight * DPR;
    tctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  var lastTX = -1, lastTY = -1;
  var trailGate = false; // frame-gate: at most one particle spawn per rAF
  window.addEventListener('mousemove', function (e) {
    if (reduceMotion || trailGate) return;
    var dx = e.clientX - lastTX, dy = e.clientY - lastTY;
    if (Math.abs(dx) + Math.abs(dy) < 4) return;
    trailGate = true;
    requestAnimationFrame(function () { trailGate = false; });
    lastTX = e.clientX; lastTY = e.clientY;
    if (trail.length < 90) {
      trail.push({
        x: e.clientX, y: e.clientY,
        vx: dx * 0.06 + (Math.random() - 0.5) * 0.5,
        vy: dy * 0.06 + (Math.random() - 0.5) * 0.5,
        r: 1.4 + Math.random() * 2.4,
        life: 1,
        c: trailColors[(Math.random() * trailColors.length) | 0]
      });
    }
  }, { passive: true });

  function drawTrail() {
    tctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = trail.length - 1; i >= 0; i--) {
      var p = trail[i];
      p.life -= 0.022;
      if (p.life <= 0) { trail.splice(i, 1); continue; }
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.97; p.vy *= 0.97;
      tctx.globalAlpha = Math.max(0, p.life) * 0.75;
      tctx.fillStyle = p.c;
      tctx.beginPath();
      tctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      tctx.fill();
    }
    tctx.globalAlpha = 1;
  }

  /* ─────────────────────────────────────────────
     4 · Generative chapter art (three canvases)
     Halftone bloom renderer — echoes the solarized
     flower motif with dots + petal blobs.
  ───────────────────────────────────────────── */
  function drawChapterArt(canvas) {
    var kind = canvas.getAttribute('data-art');
    var ctx = canvas.getContext('2d');
    // render at DPR so the art is crisp on retina displays
    var W = canvas.clientWidth || 571, H = canvas.clientHeight || 369;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var schemes = {
      '1': { bg: '#cdabfe', dots: '#fe7141', petals: ['#e3d1ff', '#b98cf7'], core: '#fe7141' },
      '2': { bg: '#3c4237', dots: '#cdabfe', petals: ['#fe7141', '#ffb59a'], core: '#f0ff1c' },
      '3': { bg: '#8f948c', dots: '#2b2b2b', petals: ['#d5d8d2', '#a9aea6'], core: '#cdabfe' }
    };
    var s = schemes[kind] || schemes['1'];
    ctx.fillStyle = s.bg;
    ctx.fillRect(0, 0, W, H);

    // soft background wash
    var wash = ctx.createRadialGradient(W * 0.35, H * 0.4, 20, W * 0.35, H * 0.4, W * 0.7);
    wash.addColorStop(0, 'rgba(255,255,255,0.22)');
    wash.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);

    // petal blobs (two bloom clusters)
    function bloom(cx, cy, baseR, petals, colors) {
      for (var p = 0; p < petals; p++) {
        var ang = (p / petals) * Math.PI * 2 + Math.random() * 0.4;
        var pr = baseR * (0.75 + Math.random() * 0.5);
        var px = cx + Math.cos(ang) * baseR * 0.55;
        var py = cy + Math.sin(ang) * baseR * 0.45;
        var g = ctx.createRadialGradient(px, py, 2, px, py, pr);
        g.addColorStop(0, colors[0]);
        g.addColorStop(0.7, colors[1]);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(px, py, pr, pr * 0.62, ang, 0, Math.PI * 2);
        ctx.fill();
      }
      // core
      var cg = ctx.createRadialGradient(cx, cy, 1, cx, cy, baseR * 0.35);
      cg.addColorStop(0, s.core);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
    bloom(W * 0.36, H * 0.52, 92, 7, s.petals);
    bloom(W * 0.68, H * 0.38, 64, 6, s.petals);

    // halftone dot field, sparser at the right
    for (var y = 6; y < H; y += 9) {
      for (var x = 6; x < W; x += 9) {
        var n = Math.sin(x * 0.021) * Math.cos(y * 0.03) + Math.sin((x + y) * 0.011);
        var r = Math.max(0, n) * 2.6 * (1 - x / (W * 1.6));
        if (r > 0.4) {
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = s.dots;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;

    // small "specimen card" overlays, like pinned swatches
    function card(x, y, w, h, fill, label) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.06);
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.strokeRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(250,250,248,0.95)';
      ctx.fillRect(4, h - 14, 74, 11);
      ctx.fillStyle = '#333';
      ctx.font = '7px "IBM Plex Mono", monospace';
      ctx.fillText(label, 7, h - 6);
      ctx.restore();
    }
    var grad1 = ctx.createLinearGradient(0, 0, 90, 60);
    grad1.addColorStop(0, s.petals[0]); grad1.addColorStop(1, s.core);
    card(W * 0.16, H * 0.62, 92, 62, grad1, 'FIELD 0' + kind);
    var grad2 = ctx.createLinearGradient(0, 0, 80, 56);
    grad2.addColorStop(0, s.core); grad2.addColorStop(1, s.petals[1]);
    card(W * 0.55, H * 0.66, 82, 56, grad2, 'SAMPLE ' + (4 + Number(kind)));
  }

  /* ─────────────────────────────────────────────
     5 · Hero intro (plays after preloader ends)
  ───────────────────────────────────────────── */
  var introPlayed = false;
  function playHeroIntro() {
    if (introPlayed) return;
    introPlayed = true;
    if (!window.gsap || reduceMotion) return;
    gsap.fromTo('.hero-line',
      { yPercent: 108 },
      { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.15 });
    gsap.fromTo('#hero-tagline',
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', delay: 0.55 });
    gsap.fromTo('.hero-tag',
      { autoAlpha: 0, scale: 0.85 },
      { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'back.out(2)', stagger: 0.15, delay: 0.4, clearProps: 'scale' });
    gsap.to('#scroll-arrow', { y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut' });
  }

  /* ─────────────────────────────────────────────
     6 · Scroll story (GSAP ScrollTrigger)
     All tweens are enter-triggered fromTo's; at
     progress=0 nothing is stuck hidden because the
     hero intro runs on load, and section reveals
     only apply above the fold-line they animate at.
  ───────────────────────────────────────────── */
  function initScrollStory() {
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    // generic section reveals
    document.querySelectorAll('.reveal-section').forEach(function (sec) {
      gsap.fromTo(sec.querySelectorAll('.mono-label, h2, h3'),
        { y: 36, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: sec, start: 'top 78%', toggleActions: 'play none none none' }
        });
    });

    // wide photo: clip + parallax drift
    gsap.fromTo('#photo-wide',
      { clipPath: 'inset(12% 4% 12% 4%)', scale: 1.06 },
      {
        clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none',
        scrollTrigger: { trigger: '#inflection .media-frame', start: 'top 92%', end: 'top 25%', scrub: true }
      });

    // stat panels rise in, numbers count up
    gsap.utils.toArray('.stat-panel').forEach(function (panel, i) {
      gsap.fromTo(panel,
        { y: 70, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '#stats', start: 'top 70%' }
        });
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: function () {
          el.textContent = Math.round(obj.v).toLocaleString('en-US') + suffix;
        }
      });
    });

    // mission paragraphs
    gsap.fromTo('#mission > div > *',
      { y: 30, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '#mission', start: 'top 72%' }
      });

    // quote: big text wipes up, portrait fades
    gsap.fromTo('#quote-text',
      { y: 60, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '#quote', start: 'top 62%' }
      });
    gsap.fromTo('#quote img',
      { scale: 0.9, autoAlpha: 0 },
      {
        scale: 1, autoAlpha: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '#quote', start: 'top 62%' }
      });

    // chapters: number parallax + art drift + list stagger
    gsap.utils.toArray('.chapter').forEach(function (ch) {
      gsap.fromTo(ch.querySelector('.chapter-name'),
        { y: 60, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ch, start: 'top 70%' }
        });
      gsap.fromTo(ch.querySelector('.chapter-art'),
        { y: 90 },
        {
          y: -30, ease: 'none',
          scrollTrigger: { trigger: ch, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      gsap.fromTo(ch.querySelectorAll('.chapter-list li'),
        { x: -26, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: ch.querySelector('.chapter-list'), start: 'top 82%' }
        });
      gsap.fromTo(ch.querySelector('.cta-bar'),
        { y: 40, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ch.querySelector('.cta-bar'), start: 'top 92%' }
        });
    });

    // case cards slide up staggered
    gsap.fromTo('.case-card',
      { y: 80, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '#carousel', start: 'top 82%' }
      });

    // feature poster reveal
    gsap.fromTo('.feature-poster',
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.inOut',
        scrollTrigger: { trigger: '#feature', start: 'top 68%' }
      });

    // subscribe heading
    gsap.fromTo('#subscribe h2, #subscribe p, #sub-form',
      { y: 40, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '#subscribe', start: 'top 68%' }
      });

    // footer wordmark & year rise with scrub
    gsap.fromTo('#footer-mark',
      { yPercent: 46 },
      {
        yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: 'footer', start: 'top 96%', end: 'top 45%', scrub: true }
      });
    gsap.fromTo('#footer-year',
      { yPercent: 60, autoAlpha: 0.3 },
      {
        yPercent: 0, autoAlpha: 1, ease: 'none',
        scrollTrigger: { trigger: '#footer-year', start: 'top 105%', end: 'top 70%', scrub: true }
      });
  }

  /* ─────────────────────────────────────────────
     7 · Carousel controls
  ───────────────────────────────────────────── */
  function initCarousel() {
    var track = document.getElementById('carousel');
    var prev = document.getElementById('car-prev');
    var next = document.getElementById('car-next');
    if (!track || !prev || !next) return;
    var step = function () {
      var card = track.querySelector('.case-card');
      return card ? card.getBoundingClientRect().width + 16 : 476;
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    var syncBtns = function () {
      prev.classList.toggle('disabled', track.scrollLeft <= 4);
      next.classList.toggle('disabled', track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
    };
    track.addEventListener('scroll', syncBtns, { passive: true });
    syncBtns();
  }

  /* ─────────────────────────────────────────────
     8 · Subscribe form (demo behavior)
  ───────────────────────────────────────────── */
  function initForm() {
    var form = document.getElementById('sub-form');
    var msg = document.getElementById('sub-msg');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('sub-email');
      if (!email.value || email.value.indexOf('@') < 0) {
        msg.textContent = 'Please enter a valid email address.';
        return;
      }
      msg.textContent = 'Thanks — you’re on the list. (Demo page: nothing was sent.)';
      email.value = '';
    });
  }

  /* ─────────────────────────────────────────────
     9 · Media fallbacks — a broken remote image
     becomes a quiet gradient panel, never a hole.
  ───────────────────────────────────────────── */
  function replaceWithPlaceholder(img) {
    var ph = document.createElement('div');
    ph.style.cssText = 'width:100%;height:100%;min-height:280px;background:' +
      'linear-gradient(135deg,#3c4237 0%,#5d6a55 45%,#cdabfe 130%);';
    ph.setAttribute('role', 'img');
    ph.setAttribute('aria-label', img.alt || 'placeholder');
    if (img.parentNode) img.parentNode.replaceChild(ph, img);
  }

  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) {
        // already failed before we could listen
        replaceWithPlaceholder(img);
        return;
      }
      img.addEventListener('error', function () {
        replaceWithPlaceholder(img);
      }, { once: true });
    });
  }

  /* ─────────────────────────────────────────────
     Boot + single rAF loop + resize
  ───────────────────────────────────────────── */
  var rafId = null;
  function loop(now) {
    if (!reduceMotion) {
      drawHero(now || 0);
      drawTrail();
    }
    rafId = requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else if (!rafId) {
      rafId = requestAnimationFrame(loop);
    }
  });

  var resizeT = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () {
      var prevW = heroW;
      sizeHero();
      sizeTrail();
      // keep the animation state unless the layout changed dramatically
      if (Math.abs(heroW - prevW) > 200) seedBlobs();
      document.querySelectorAll('.chapter-art').forEach(drawChapterArt);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 180);
  });

  function boot() {
    sizeHero();
    seedBlobs();
    sizeTrail();
    document.querySelectorAll('.chapter-art').forEach(drawChapterArt);
    initScrollStory();
    initCarousel();
    initForm();
    initImageFallbacks();
    if (reduceMotion) {
      // static single frame for hero so the banner is never empty
      drawHero(0);
    } else {
      rafId = requestAnimationFrame(loop);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
