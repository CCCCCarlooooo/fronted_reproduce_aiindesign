/* ============================================
   AI in Design Report 2026 — Interactive Script
   Native Canvas + Vanilla JS + GSAP ScrollTrigger
   ============================================ */

(function() {
  'use strict';

  // ─── CONFIG ────────────────────────────────
  var CONFIG = {
    particleCount: 60,
    particleMaxLife: 120,
    particleSpeed: 0.3,
    trailAlpha: 0.08,
    mouseInfluence: 150,
    loaderDuration: 1800,
    counterDuration: 2000,
    colors: {
      particle: 'rgba(0, 0, 0, 0.06)',
      particleHover: 'rgba(0, 0, 238, 0.12)',
      trail: 'rgba(255, 255, 255, 0.98)'
    }
  };

  // ─── GLOBALS ───────────────────────────────
  var canvas, ctx, particles = [], mouse = { x: -1000, y: -1000 }, rafId;
  var countersAnimated = new Set();
  var animationsStarted = false;

  // ─── PRELOADER ──────────────────────────────
  function initPreloader() {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;
    setTimeout(function() {
      preloader.classList.add('hidden');
      setTimeout(function() { preloader.style.display = 'none'; }, 600);
      startAnimations();
    }, CONFIG.loaderDuration);

    // Failsafe: hide after 4s regardless
    setTimeout(function() {
      if (!preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        setTimeout(function() { preloader.style.display = 'none'; }, 600);
        startAnimations();
      }
    }, 4000);
  }

  // ─── CANVAS PARTICLE SYSTEM ────────────────
  function Particle(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * CONFIG.particleSpeed;
    this.vy = (Math.random() - 0.5) * CONFIG.particleSpeed;
    this.life = Math.random() * CONFIG.particleMaxLife;
    this.maxLife = CONFIG.particleMaxLife;
    this.radius = Math.random() * 2 + 0.5;
    this.isHover = false;
  }

  Particle.prototype.update = function() {
    // Mouse influence
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0 && dist < CONFIG.mouseInfluence) {
      var force = (CONFIG.mouseInfluence - dist) / CONFIG.mouseInfluence;
      this.vx -= (dx / dist) * force * 0.5;
      this.vy -= (dy / dist) * force * 0.5;
      this.isHover = true;
    } else {
      this.isHover = false;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.life++;

    // Wrap around
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

    // Respawn
    if (this.life > this.maxLife) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * CONFIG.particleSpeed;
      this.vy = (Math.random() - 0.5) * CONFIG.particleSpeed;
      this.life = 0;
    }
  };

  Particle.prototype.draw = function() {
    var alpha = 1 - (this.life / this.maxLife);
    alpha *= 0.4;
    if (this.isHover) {
      ctx.fillStyle = 'rgba(0, 0, 238, ' + (alpha * 1.5) + ')';
      this.radius = Math.min(this.radius + 0.1, 3);
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
      this.radius = Math.max(this.radius - 0.05, 0.5);
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  function initCanvas() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (var i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }
    animateCanvas();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function animateCanvas() {
    if (!ctx) return;
    ctx.fillStyle = CONFIG.colors.trail;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Draw connections between nearby particles
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          var alpha = (1 - dist / 100) * 0.05;
          ctx.strokeStyle = 'rgba(0, 0, 0, ' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(animateCanvas);
  }

  // ─── MOUSE TRACKING ───────────────────────
  function initMouseTracking() {
    document.addEventListener('mousemove', function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    document.addEventListener('mouseleave', function() {
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  // ─── GSAP SCROLL ANIMATIONS ───────────────
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Fallback: just show everything
      document.querySelectorAll('.anim-fade-up').forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger on resize
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        ScrollTrigger.refresh();
      }, 250);
    });

    // Fade-up animations
    document.querySelectorAll('.anim-fade-up').forEach(function(el, i) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Hero parallax
    gsap.to('.hero-content', {
      yPercent: -15,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Partners logo scale
    gsap.fromTo('.partners-logo-large',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.partners-section',
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Chapter numbers stagger
    document.querySelectorAll('.chapter-section').forEach(function(section) {
      gsap.fromTo(section.querySelector('.chapter-number'),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Case study cards stagger
    gsap.utils.toArray('.case-card').forEach(function(card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Coming soon video reveal
    gsap.fromTo('.coming-soon-video',
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.coming-soon-section',
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Quote image reveal
    gsap.fromTo('.quote-img',
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.quote-section',
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // ─── COUNTER ANIMATIONS ───────────────────
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target) || countersAnimated.has(el)) return;
    countersAnimated.add(el);

    var start = 0;
    var startTime = null;
    var duration = CONFIG.counterDuration;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(easedProgress * target);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: animate all immediately
      document.querySelectorAll('.counter').forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(function(el) {
      observer.observe(el);
    });
  }

  // ─── NAVIGATION ───────────────────────────
  function initNavigation() {
    var trigger = document.getElementById('case-studies-trigger');
    var dropdown = document.getElementById('case-studies-dropdown');
    if (!trigger || !dropdown) return;

    var hideTimeout;
    trigger.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
      dropdown.classList.add('active');
    });
    trigger.addEventListener('mouseleave', function() {
      hideTimeout = setTimeout(function() {
        if (!dropdown.matches(':hover')) {
          dropdown.classList.remove('active');
        }
      }, 200);
    });
    dropdown.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
    });
    dropdown.addEventListener('mouseleave', function() {
      dropdown.classList.remove('active');
    });

    // Smooth scroll for "Scroll to read" link
    var scrollLink = document.getElementById('scroll-to-partners');
    if (scrollLink) {
      scrollLink.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById('partners');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // ─── START ANIMATIONS ─────────────────────
  function startAnimations() {
    if (animationsStarted) return;
    animationsStarted = true;
    initScrollAnimations();
    initCounters();
  }

  // ─── INITIALIZATION ────────────────────────
  function init() {
    initPreloader();
    initCanvas();
    initMouseTracking();
    initNavigation();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
