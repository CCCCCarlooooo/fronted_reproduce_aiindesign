/* ===================================================================
   AI in Design Report 2026 — reproduction logic
   Classic script (no modules) — native Canvas particle trail + GSAP
   =================================================================== */
(function () {
  "use strict";

  /* ---------- Asset data ---------- */
  var IMG = "https://framerusercontent.com/images/";
  var ASSET = "https://framerusercontent.com/assets/";

  // Hero collage abstract tiles (verified 200, ACAO:*)
  var COLLAGE = [
    IMG + "rd6RC3C2g354mvaTXc22Z8hsrkI.png?scale-down-to=512",
    IMG + "BjnduoVw73i89zvx0jvqhBI6pY.png?scale-down-to=512",
    IMG + "sVDqVYB6apEiCQWv3SUiu02DuE.jpg?scale-down-to=512",
    IMG + "vdlaU7hXYvHA03hPLaBqE2TMTIA.jpg?scale-down-to=512",
    IMG + "9q6atfyxUQWgbbNEpOcKeKHVMo8.png?scale-down-to=512",
    IMG + "aoiJOJb5U9lPHiXQOrywfzn8ftQ.png?scale-down-to=512",
    IMG + "qsqwQqO5XlCp5ZWs7hJuiL0Y.png?scale-down-to=512"
  ];

  // Case studies (grayscale people-interview webm first-frames)
  var PEOPLE = [
    ASSET + "11fQjZ8SBLFtf9GDiGqEbzqKI8.webm",
    ASSET + "60TSo4WrKzA27Mp4KCDTmVbhc.webm"
  ];
  var PEOPLE_POSTER = IMG + "LKdFBU4cZXjWWQJR62rMmwUFg.jpg?width=1280&height=720";
  var CASES = [
    { name: "Stripe",    desc: "Creating the conditions for adoption",  vid: PEOPLE[0], img: PEOPLE_POSTER },
    { name: "Sierra",    desc: "Scaling craft, keeping the bar",        vid: PEOPLE[1], img: PEOPLE_POSTER },
    { name: "Anthropic", desc: "When code is no longer the constraint", vid: PEOPLE[0], img: PEOPLE_POSTER },
    { name: "Notion",    desc: "Growing as a designer",                 vid: PEOPLE[1], img: PEOPLE_POSTER },
    { name: "Framer",    desc: "Working alongside agents",              vid: PEOPLE[0], img: PEOPLE_POSTER },
    { name: "Linear",    desc: "Protecting the space to explore",       vid: PEOPLE[1], img: PEOPLE_POSTER },
    { name: "Shopify",   desc: "Designing the design tools",            vid: PEOPLE[0], img: PEOPLE_POSTER }
  ];

  /* =================================================================
     1. PRELOADER (with hard timeout fallback)
     ================================================================= */
  var loader = document.getElementById("loader");
  var loaderFill = document.getElementById("loaderFill");
  var progress = 0, loaderDone = false;
  var loaderTick = setInterval(function () {
    progress = Math.min(progress + Math.random() * 18, 100);
    if (loaderFill) loaderFill.style.width = progress + "%";
    if (progress >= 100) { clearInterval(loaderTick); finishLoader(); }
  }, 130);
  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    if (loaderFill) loaderFill.style.width = "100%";
    if (loader) loader.classList.add("hidden");
    startReveals();
  }
  // Safety: never let the loader block the page
  window.addEventListener("load", function () { setTimeout(finishLoader, 400); });
  setTimeout(finishLoader, 2600);
  // Recompute ScrollTrigger positions after images/fonts settle (heights change)
  window.addEventListener("load", function () {
    setTimeout(function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); }, 500);
  });

  /* =================================================================
     2. HERO COLLAGE TILES
     ================================================================= */
  (function buildCollage() {
    var wrap = document.getElementById("heroCollage");
    if (!wrap) return;
    // scattered tiles — denser overlapping media band like the original
    var layout = [
      { l: "28%", t: "5%",  w: "13%", h: "46%", tag: "FOUNDER", rot: -2 },
      { l: "46%", t: "16%", w: "16%", h: "60%", tag: "",        rot: 1.5 },
      { l: "-2%", t: "30%", w: "22%", h: "50%", tag: "",        rot: -3 },
      { l: "86%", t: "20%", w: "16%", h: "52%", tag: "",        rot: 2.5 },
      { l: "62%", t: "1%",  w: "12%", h: "38%", tag: "",        rot: -1.5 },
      { l: "14%", t: "40%", w: "12%", h: "44%", tag: "",        rot: 3 },
      { l: "72%", t: "44%", w: "14%", h: "46%", tag: "LEAD",    rot: -2.5 }
    ];
    layout.forEach(function (o, i) {
      var tile = document.createElement("div");
      tile.className = "tile";
      tile.style.left = o.l; tile.style.top = o.t;
      tile.style.width = o.w; tile.style.height = o.h;
      tile.style.transform = "rotate(" + o.rot + "deg)";
      var im = document.createElement("img");
      im.src = COLLAGE[i % COLLAGE.length];
      im.alt = ""; im.loading = "eager";
      im.onerror = function () { tile.style.background = "linear-gradient(135deg,#cdabfe,#fe7141)"; im.remove(); };
      tile.appendChild(im);
      if (o.tag) {
        var t = document.createElement("span"); t.className = "tag"; t.textContent = o.tag;
        tile.appendChild(t);
      }
      tile.setAttribute("data-depth", (0.1 + i * 0.07).toFixed(2));
      tile.setAttribute("data-rot", o.rot);
      wrap.appendChild(tile);
    });
  })();

  /* =================================================================
     3. CASE STUDY CARDS
     ================================================================= */
  (function buildCases() {
    var track = document.getElementById("casesTrack");
    if (!track) return;
    CASES.forEach(function (c) {
      var card = document.createElement("article");
      card.className = "case-card";
      var media = document.createElement("div");
      media.className = "case-media";
      var tag = document.createElement("span");
      tag.className = "case-tag"; tag.textContent = "Coming soon";
      media.appendChild(tag);

      if (c.vid) {
        var v = document.createElement("video");
        v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = "auto";
        v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("autoplay", "");
        // poster fallback image behind the video
        v.poster = c.img;
        // set src directly (not via <source>) so the error event reaches this handler
        v.src = c.vid;
        v.onerror = function () { swapToImg(media, c.img); };
        media.appendChild(v);
        // kick off autoplay; keep poster if blocked
        v.play().catch(function () {});
      } else {
        swapToImg(media, c.img);
      }
      card.appendChild(media);

      var info = document.createElement("div");
      info.className = "case-info";
      info.innerHTML =
        '<p class="case-name">' + c.name + '</p>' +
        '<p class="case-desc">' + c.desc + '</p>' +
        '<a class="case-link" href="https://example.com/">Get notified <span class="arrow">→</span></a>';
      card.appendChild(info);
      track.appendChild(card);
    });

    function swapToImg(media, src) {
      var existing = media.querySelector("video"); if (existing) existing.remove();
      if (media.querySelector("img")) return;
      var im = document.createElement("img");
      im.src = src; im.alt = "";
      im.onerror = function () { media.style.background = "#2a2a2a"; im.remove(); };
      media.insertBefore(im, media.firstChild);
    }

    // Carousel controls
    var idx = 0;
    var prev = document.getElementById("casePrev");
    var next = document.getElementById("caseNext");
    function cardStep() {
      var card = track.querySelector(".case-card");
      if (!card) return 480;
      var style = getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 24) || 24;
      return card.getBoundingClientRect().width + gap;
    }
    function maxIdx() {
      var wrap = track.parentElement.getBoundingClientRect().width;
      var step = cardStep();
      var visible = Math.max(1, Math.floor(wrap / step));
      return Math.max(0, CASES.length - visible);
    }
    function apply() {
      idx = Math.max(0, Math.min(idx, maxIdx()));
      track.style.transform = "translateX(" + (-idx * cardStep()) + "px)";
    }
    if (next) next.addEventListener("click", function () { idx++; apply(); });
    if (prev) prev.addEventListener("click", function () { idx--; apply(); });
    window.addEventListener("resize", apply);
  })();

  /* =================================================================
     3b. CHAPTER ART VIDEOS (animated halftone)
     ================================================================= */
  (function buildChapterVideos() {
    document.querySelectorAll("[data-chapter-video]").forEach(function (fig) {
      var url = fig.getAttribute("data-chapter-video");
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = "auto";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("autoplay", "");
      v.src = url; // direct src so onerror reaches this handler
      v.onerror = function () { /* CSS accent bg remains as fallback */ };
      fig.appendChild(v);
      v.play().catch(function () {});
    });
  })();

  /* Coming-soon feature video (opt-in via data-people-video; static img otherwise) */
  (function comingVideo() {
    var host = document.querySelector("[data-people-video]");
    if (!host) return;
    var url = host.getAttribute("data-people-video");
    var v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = "auto";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("autoplay", "");
    v.src = url; // direct src so onerror reaches this handler
    v.onerror = function () {}; // img fallback remains
    host.insertBefore(v, host.firstChild);
    v.play().catch(function () {});
  })();

  /* =================================================================
     4. NATIVE CANVAS PARTICLE TRAIL
     ================================================================= */
  (function particleTrail() {
    var canvas = document.getElementById("trail");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var dpr = 1;
    var W = 0, H = 0;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2); // re-read for cross-monitor DPI changes
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var PALETTE = ["#FE7141", "#CDABFE", "#D1DDD3", "#F0FF1C", "#111111"];
    var particles = [];
    var mouse = { x: -999, y: -999, px: -999, py: -999 };

    function addParticles(x, y, speed) {
      var count = Math.min(3 + Math.floor(speed / 6), 8);
      for (var i = 0; i < count; i++) {
        particles.push({
          x: x, y: y,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          life: 1,
          decay: 0.012 + Math.random() * 0.02,
          size: 2 + Math.random() * 5,
          color: PALETTE[(Math.random() * PALETTE.length) | 0]
        });
      }
    }

    window.addEventListener("mousemove", function (e) {
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      var dx = mouse.x - mouse.px, dy = mouse.y - mouse.py;
      var speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.5) addParticles(mouse.x, mouse.y, speed);
    });

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // cap for perf
      if (particles.length > 400) particles.splice(0, particles.length - 400);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  /* =================================================================
     5. GSAP SCROLL NARRATIVE
     ================================================================= */
  var revealsStarted = false;
  function startReveals() {
    if (revealsStarted) return;
    revealsStarted = true;
    if (typeof gsap === "undefined") {
      // GSAP CDN failed (e.g. offline file:// open) — un-hide everything so no
      // content is ever stuck in a CSS `from` (opacity:0) state.
      document.querySelectorAll(".reveal-up,.reveal-img").forEach(function (el) {
        el.style.opacity = 1; el.style.transform = "none";
      });
      document.querySelectorAll(".chapter").forEach(function (ch) {
        ch.style.backgroundColor = ch.getAttribute("data-accent");
      });
      initCounters(); // has its own no-gsap path
      return;
    }
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* --- Hero title: scrub reveal that STARTS visible (never stuck transparent) --- */
    var heroSpans = document.querySelectorAll(".hero-title span");
    if (heroSpans.length && !reduce) {
      gsap.from(heroSpans, {
        yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.12,
        ease: "power3.out", delay: 0.15
      });
    }

    /* --- Hero collage parallax on scroll --- */
    if (window.ScrollTrigger && !reduce) {
      gsap.utils.toArray(".hero-collage .tile").forEach(function (tile) {
        var depth = parseFloat(tile.getAttribute("data-depth")) || 0.2;
        var rot = parseFloat(tile.getAttribute("data-rot")) || 0;
        gsap.set(tile, { rotation: rot }); // let GSAP own the transform, keeping the tilt
        gsap.to(tile, {
          y: -120 * depth * 3, rotation: rot,
          ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
        });
      });
    }

    /* --- Generic reveal-up elements --- */
    if (window.ScrollTrigger) {
      gsap.utils.toArray(".reveal-up").forEach(function (el) {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
      gsap.utils.toArray(".reveal-img").forEach(function (el) {
        gsap.to(el, {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });
    }
    // Fallback: if ScrollTrigger missing, just show them
    if (!window.ScrollTrigger) {
      document.querySelectorAll(".reveal-up,.reveal-img").forEach(function (el) {
        el.style.opacity = 1; el.style.transform = "none";
      });
    }

    /* --- Chapter accent background reveal --- */
    if (window.ScrollTrigger && !reduce) {
      document.querySelectorAll(".chapter").forEach(function (ch) {
        var accent = ch.getAttribute("data-accent");
        gsap.fromTo(ch,
          { backgroundColor: "#ffffff" },
          {
            backgroundColor: accent, ease: "none",
            scrollTrigger: { trigger: ch, start: "top 80%", end: "top 30%", scrub: true }
          }
        );
        // chapter art subtle parallax
        var art = ch.querySelector(".chapter-art video, .chapter-art img");
        if (art) gsap.fromTo(art, { yPercent: -6 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    } else {
      document.querySelectorAll(".chapter").forEach(function (ch) {
        ch.style.backgroundColor = ch.getAttribute("data-accent");
      });
    }

    /* --- Counters --- */
    initCounters();

    /* --- Finale type parallax --- */
    if (window.ScrollTrigger && !reduce) {
      gsap.from(".ft-1", {
        xPercent: -6, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: "#finale", start: "top 60%", end: "center center", scrub: true }
      });
      gsap.from(".ft-2", {
        xPercent: 8, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: "#finale", start: "top 40%", end: "bottom bottom", scrub: true }
      });
    }

    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }

  /* =================================================================
     6. NUMBER COUNTERS
     ================================================================= */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    nums.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var obj = { v: 0 };
      function run() {
        if (typeof gsap !== "undefined") {
          gsap.to(obj, {
            v: target, duration: 1.6, ease: "power2.out",
            onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
          });
        } else {
          el.textContent = target + suffix;
        }
      }
      if (window.ScrollTrigger) {
        ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: run });
      } else {
        run();
      }
    });
  }

  // If GSAP somehow already ready and loader instant, ensure reveals run
  if (document.readyState === "complete") setTimeout(function () { if (!revealsStarted && loaderDone) startReveals(); }, 100);
})();
