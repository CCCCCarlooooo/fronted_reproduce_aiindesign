/* ============================================
   AI in Design Report 2026 — Interactive Logic
   Native Canvas + Vanilla JS + GSAP ScrollTrigger
   ============================================ */

(function () {
  'use strict';

  // ========================================
  // 1. PRELOADER
  // ========================================
  var preloader = document.getElementById('preloader');
  var preloaderCount = document.getElementById('preloaderCount');
  var preloaderBar = document.getElementById('preloaderBar');
  var loadProgress = 0;
  var loadTarget = 100;
  var loadInterval;

  function startPreloader() {
    loadInterval = setInterval(function () {
      loadProgress += Math.random() * 8 + 2;
      if (loadProgress >= loadTarget) {
        loadProgress = loadTarget;
        clearInterval(loadInterval);
        setTimeout(hidePreloader, 400);
      }
      preloaderCount.textContent = Math.floor(loadProgress);
      preloaderBar.style.width = loadProgress + '%';
    }, 60);
  }

  function hidePreloader() {
    if (preloader) {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');
      initAnimations();
    }
  }

  // Timeout fallback: never block > 4s
  setTimeout(function () {
    if (loadProgress < 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      hidePreloader();
    }
  }, 4000);

  // ========================================
  // 2. PARTICLE CANVAS (Mouse Trail)
  // ========================================
  var canvas = document.getElementById('particle-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var particles = [];
  var mouseX = 0;
  var mouseY = 0;
  var isMouseMoving = false;
  var mouseTimeout;
  var animFrameId;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.life = 1.0;
    this.decay = 0.015 + Math.random() * 0.01;
    this.size = Math.random() * 3 + 1;
    this.hue = Math.random() > 0.5 ? 20 : 270; // orange or purple
  }

  function updateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      if (p.hue === 20) {
        ctx.fillStyle = 'rgba(254, 113, 65, ' + (p.life * 0.4) + ')';
      } else {
        ctx.fillStyle = 'rgba(205, 186, 254, ' + (p.life * 0.4) + ')';
      }
      ctx.fill();
    }

    // Draw connecting lines between nearby particles
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 60) {
          var alpha = (1 - dist / 60) * 0.1 * particles[a].life * particles[b].life;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = 'rgba(254, 113, 65, ' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animFrameId = requestAnimationFrame(updateParticles);
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;

    // Add particles on mouse move
    if (particles.length < 80) {
      for (var i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    }

    // Update cursor glow
    var glow = document.getElementById('cursorGlow');
    if (glow) {
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
      glow.classList.add('active');
    }

    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(function () {
      isMouseMoving = false;
      if (glow) glow.classList.remove('active');
    }, 300);
  }

  function initCanvas() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', onMouseMove);
    updateParticles();
  }

  // ========================================
  // 3. MENU TOGGLE
  // ========================================
  window.toggleMenu = function () {
    var btn = document.getElementById('menuBtn');
    var overlay = document.getElementById('menuOverlay');
    if (btn && overlay) {
      btn.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    }
  };

  // ========================================
  // 4. NAV SCROLL BEHAVIOR
  // ========================================
  function initNavScroll() {
    var nav = document.getElementById('mainNav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Check if we're in dark section
      var subscribe = document.getElementById('scroll-to-subscribe');
      var footer = document.querySelector('.footer');
      if (subscribe || footer) {
        var subscribeTop = subscribe ? subscribe.getBoundingClientRect().top : Infinity;
        var footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
        if (subscribeTop < 64 || footerTop < 64) {
          nav.classList.add('dark-section');
          nav.style.color = 'white';
        } else {
          nav.classList.remove('dark-section');
          nav.style.color = '';
        }
      }
    });
  }

  // ========================================
  // 5. GSAP SCROLL ANIMATIONS
  // ========================================
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Fallback: just show everything
      document.querySelectorAll('.reveal, .stat-card, .about-text, .quote-card, .chapter-card, .case-card, .video-card, .partner-logo').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Hero reveals ---
    gsap.utils.toArray('.hero .reveal').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 + i * 0.15, ease: 'power3.out' }
      );
    });

    // --- Hero images stagger ---
    gsap.utils.toArray('#heroImages img').forEach(function (img, i) {
      gsap.fromTo(img,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 + i * 0.12, ease: 'power2.out' }
      );
    });

    // --- Generic reveal animations ---
    gsap.utils.toArray('.reveal').forEach(function (el) {
      if (el.closest('.hero')) return; // skip hero reveals (already handled)
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Partner logos ---
    gsap.utils.toArray('.partner-logo').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: {
            trigger: el.closest('.partners-grid'),
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Stat cards ---
    gsap.utils.toArray('.stat-card').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: i * 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: function () { animateCounter(el); }
          }
        }
      );
    });

    // --- About text ---
    gsap.fromTo('.about-text',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    // --- Quote card ---
    gsap.fromTo('.quote-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.quote-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // --- Chapter cards ---
    gsap.utils.toArray('.chapter-card').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Case study cards ---
    gsap.utils.toArray('.case-card').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Video card ---
    gsap.fromTo('.video-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-card',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // --- Inflection heading parallax ---
    gsap.to('.inflection-heading', {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.inflection',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // ========================================
  // 6. COUNTER ANIMATION
  // ========================================
  function animateCounter(container) {
    var counters = container.querySelectorAll('.counter');
    counters.forEach(function (counter) {
      if (counter.dataset.animated) return;
      counter.dataset.animated = 'true';

      var target = parseInt(counter.dataset.target, 10);
      var duration = 2000;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
  }

  // Also animate footer counters on scroll
  function initFooterCounters() {
    var footerCounters = document.querySelectorAll('.footer .counter');
    if (!footerCounters.length) return;

    if (typeof IntersectionObserver !== 'undefined') {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var counter = entry.target;
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';

            var target = parseInt(counter.dataset.target, 10);
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target);
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counter.textContent = target;
              }
            }
            requestAnimationFrame(step);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });

      footerCounters.forEach(function (c) { observer.observe(c); });
    }
  }

  // ========================================
  // 7. HOVER INTERACTIONS
  // ========================================
  function initHoverEffects() {
    // Case cards: subtle tilt on hover
    document.querySelectorAll('.case-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });

    // Chapter links: arrow slide on hover
    document.querySelectorAll('.chapter-link').forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        var arrow = link.querySelector('.arrow');
        if (arrow) arrow.style.transform = 'translateX(6px)';
      });
      link.addEventListener('mouseleave', function () {
        var arrow = link.querySelector('.arrow');
        if (arrow) arrow.style.transform = '';
      });
    });

    // Partner logos: scale on hover
    document.querySelectorAll('.partner-logo').forEach(function (logo) {
      logo.addEventListener('mouseenter', function () {
        logo.style.transform = 'scale(1.05)';
      });
      logo.addEventListener('mouseleave', function () {
        logo.style.transform = '';
      });
    });
  }

  // ========================================
  // 8. SMOOTH SCROLL for anchor links
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ========================================
  // 9. VIDEO PLAY BUTTON
  // ========================================
  function initVideoPlay() {
    var playBtn = document.querySelector('.video-play-btn');
    if (!playBtn) return;

    playBtn.addEventListener('click', function () {
      var video = playBtn.parentElement.querySelector('video');
      if (video) {
        if (video.paused) {
          video.play();
          playBtn.style.opacity = '0';
        } else {
          video.pause();
          playBtn.style.opacity = '1';
        }
      }
    });
  }

  // ========================================
  // 10. SCROLL PROGRESS INDICATOR (subtle)
  // ========================================
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#FE7141,#CDBAFE);z-index:9999;transition:width 0.1s linear;width:0%;';
    document.body.appendChild(bar);

    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    });
  }

  // ========================================
  // INIT
  // ========================================
  document.addEventListener('DOMContentLoaded', function () {
    startPreloader();
    initCanvas();
    initNavScroll();
    initHoverEffects();
    initSmoothScroll();
    initVideoPlay();
    initFooterCounters();
    initScrollProgress();
  });

})();
