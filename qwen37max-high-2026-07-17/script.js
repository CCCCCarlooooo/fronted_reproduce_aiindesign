/* ===================================
   AI in Design Report 2026 - Scripts
   =================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initCounters();
  initSmoothScroll();
});

// Initialize all scroll-triggered animations
function initAnimations() {
  // Hero animations
  gsap.from('.tagline', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });

  gsap.from('.hero-ai', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.6,
    ease: 'power3.out'
  });

  gsap.from('.hero-main', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.hero-year', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.byline', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1.5,
    ease: 'power3.out'
  });

  gsap.from('.scroll-link', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1.8,
    ease: 'power3.out'
  });

  // Partners section
  gsap.from('.partners .section-label', {
    scrollTrigger: {
      trigger: '.partners',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.partner-logo', {
    scrollTrigger: {
      trigger: '.partners-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // Inflection Point section
  gsap.from('.inflection .section-label', {
    scrollTrigger: {
      trigger: '.inflection',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.inflection-title', {
    scrollTrigger: {
      trigger: '.inflection-title',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.stats-row .stat', {
    scrollTrigger: {
      trigger: '.stats-row',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.inflection-text p', {
    scrollTrigger: {
      trigger: '.inflection-text',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
  });

  // Quote section
  gsap.from('.quote-author', {
    scrollTrigger: {
      trigger: '.quote-section',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.quote-text', {
    scrollTrigger: {
      trigger: '.quote-text',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  // Chapter sections
  const chapters = ['#chapter-tools', '#chapter-craft', '#chapter-teams'];

  chapters.forEach(chapter => {
    gsap.from(`${chapter} .chapter-number`, {
      scrollTrigger: {
        trigger: chapter,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(`${chapter} .chapter-title`, {
      scrollTrigger: {
        trigger: chapter,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from(`${chapter} .chapter-heading`, {
      scrollTrigger: {
        trigger: chapter,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out'
    });

    gsap.from(`${chapter} .chapter-intro`, {
      scrollTrigger: {
        trigger: chapter,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out'
    });

    gsap.from(`${chapter} .chapter-list li`, {
      scrollTrigger: {
        trigger: `${chapter} .chapter-list`,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    });

    gsap.from(`${chapter} .chapter-cta`, {
      scrollTrigger: {
        trigger: `${chapter} .chapter-cta`,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    });
  });

  // Case Studies section
  gsap.from('.case-studies .section-heading', {
    scrollTrigger: {
      trigger: '.case-studies',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.case-studies-title', {
    scrollTrigger: {
      trigger: '.case-studies-title',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.case-card', {
    scrollTrigger: {
      trigger: '.cases-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Coming Soon section
  gsap.from('.coming-soon .section-label', {
    scrollTrigger: {
      trigger: '.coming-soon',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.video-preview', {
    scrollTrigger: {
      trigger: '.video-preview',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.coming-soon-title', {
    scrollTrigger: {
      trigger: '.coming-soon-title',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.coming-soon-desc', {
    scrollTrigger: {
      trigger: '.coming-soon-desc',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out'
  });

  gsap.from('.notify-button', {
    scrollTrigger: {
      trigger: '.notify-button',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out'
  });

  // Subscribe section
  gsap.from('.subscribe-title', {
    scrollTrigger: {
      trigger: '.subscribe',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.subscribe-desc', {
    scrollTrigger: {
      trigger: '.subscribe-desc',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.subscribe-form', {
    scrollTrigger: {
      trigger: '.subscribe-form',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  });

  gsap.from('.subscribe-disclaimer', {
    scrollTrigger: {
      trigger: '.subscribe-disclaimer',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out'
  });

  // Methodology section
  gsap.from('.methodology .section-heading', {
    scrollTrigger: {
      trigger: '.methodology',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.methodology-intro', {
    scrollTrigger: {
      trigger: '.methodology-intro',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.method-stat', {
    scrollTrigger: {
      trigger: '.methodology-stats',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.report-partners', {
    scrollTrigger: {
      trigger: '.report-partners',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });
}

// Animated counters
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        animateCounter(counter, target, duration);
      }
    });
  });
}

function animateCounter(element, target, duration) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);

    const current = Math.floor(start + (target - start) * easeOut);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Handle form submission
document.querySelector('.subscribe-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for subscribing!');
  e.target.reset();
});

// Play button interaction
document.querySelector('.play-button')?.addEventListener('click', () => {
  alert('Video player would open here');
});

// Sidebar navigation hover effects
document.querySelectorAll('.nav-link, .nav-chapter, .nav-case').forEach(link => {
  link.addEventListener('mouseenter', function() {
    gsap.to(this, { x: 5, duration: 0.3, ease: 'power2.out' });
  });

  link.addEventListener('mouseleave', function() {
    gsap.to(this, { x: 0, duration: 0.3, ease: 'power2.out' });
  });
});

// Parallax effect for chapter numbers
gsap.utils.toArray('.chapter-number').forEach(number => {
  gsap.to(number, {
    scrollTrigger: {
      trigger: number.closest('.chapter'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: -100,
    ease: 'none'
  });
});

// Fade out hero on scroll
gsap.to('.hero', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  },
  opacity: 0,
  ease: 'none'
});

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
