/**
 * THINKSTRA '26 - Main JavaScript
 * Features: Mobile Menu, Scroll Reveal, Event Filtering, Particles
 */

(function() {
  'use strict';

  // ========================================
  // Configuration
  // ========================================
  const CONFIG = {
    particles: {
      count: 50,
      maxCount: 80,
      connectionDistance: 100,
      mouseRadius: 120
    },
    reveal: {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  };

  // ========================================
  // Event Data
  // ========================================
  const EVENTS_DATA = [
    {
      id: 1,
      title: "Prompt Engineering",
      category: "technical",
      description: "-null-",
      teamSize: "1",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    },
    {
      id: 2,
      title: "Reverse Engineering",
      category: "technical",
      description: "-null-",
      teamSize: "1-2",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
    },
    {
      id: 3,
      title: "Paper Presentation",
      category: "technical",
      description: "-null-",
      teamSize: "2",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
    },
    {
      id: 4,
      title: "AI Quiz",
      category: "technical",
      description: "-null-",
      teamSize: "1-2",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    },
    {
      id: 5,
      title: "Act It Out",
      category: "nontechnical",
      description: "-null-",
      teamSize: "2",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
    },
    {
      id: 6,
      title: "Chess Championship",
      category: "nontechnical",
      description: "-null-",
      teamSize: "1",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 16l-1.447.724a1 1 0 0 0-.553.894V20h12v-2.382a1 1 0 0 0-.553-.894L16 16"/><path d="M8.5 14h7"/><path d="M9 10h6"/><path d="M12 4v2"/><path d="M10 6h4"/></svg>`
    },
    {
      id: 7,
      title: "Chase The Clues",
      category: "nontechnical",
      description: "-null-",
      teamSize: "1-2",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    },
    {
      id: 8,
      title: "Link-It",
      category: "nontechnical",
      description: "-null-",
      teamSize: "1-2",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
    }
  ];

  // ========================================
  // DOM Elements
  // ========================================
  const elements = {
    menuToggle: document.getElementById('menuToggle'),
    mainNav: document.getElementById('mainNav'),
    mobileOverlay: document.getElementById('mobileOverlay'),
    eventsGrid: document.getElementById('eventsGrid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    particleCanvas: document.getElementById('particle-canvas'),
    navLinks: document.querySelectorAll('.nav-link'),
    revealElements: document.querySelectorAll('.animate-reveal')
  };

  // ========================================
  // Mobile Navigation
  // ========================================
  function initMobileNav() {
    const { menuToggle, mainNav, mobileOverlay } = elements;
    if (!menuToggle || !mainNav) return;

    function toggleMenu() {
      const isOpen = menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      mobileOverlay?.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMenu() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      mobileOverlay?.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    mobileOverlay?.addEventListener('click', closeMenu);

    // Close on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ========================================
  // Event Rendering & Filtering
  // ========================================
  function initEvents() {
    renderEvents('all');

    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        elements.filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter events
        renderEvents(btn.dataset.filter);
      });
    });
  }

  function renderEvents(filter) {
    const filtered = filter === 'all' 
      ? EVENTS_DATA 
      : EVENTS_DATA.filter(e => e.category === filter);

    elements.eventsGrid.innerHTML = filtered.map((event, index) => `
      <article class="event-card animate-reveal delay-${(index % 4) + 1}" data-category="${event.category}">
        <div class="event-icon" aria-hidden="true">${event.icon}</div>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-desc">${event.description}</p>
        <div class="event-meta">
          <span class="event-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
            </svg>
            ${event.teamSize} Member${event.teamSize !== '1' ? 's' : ''}
          </span>
          <span class="event-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            ${event.category === 'technical' ? 'Technical' : 'Non-Technical'}
          </span>
        </div>
      </article>
    `).join('');

    // Re-init reveal for new elements
    initScrollReveal();
  }

  // ========================================
  // Scroll Reveal Animation
  // ========================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.animate-reveal:not(.revealed)');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, CONFIG.reveal);

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  // ========================================
  // Active Nav Link
  // ========================================
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          elements.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // ========================================
  // Particle System
  // ========================================
  function initParticles() {
    const canvas = elements.particleCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Disable particles on mobile or reduced motion
    if (prefersReducedMotion || isMobile) {
      canvas.style.display = 'none';
      return;
    }

    let particles = [];
    let mouse = { x: null, y: null };
    let animationId = null;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticleArray();
    }

    function initParticleArray() {
      particles = [];
      const count = Math.min(
        CONFIG.particles.maxCount,
        Math.floor((canvas.width * canvas.height) / 20000)
      );

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.2
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < CONFIG.particles.mouseRadius) {
            const force = (CONFIG.particles.mouseRadius - dist) / CONFIG.particles.mouseRadius;
            p.x -= dx * force * 0.02;
            p.y -= dy * force * 0.02;
          }
        }

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 199, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.particles.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 199, ${0.08 * (1 - dist / CONFIG.particles.connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
      resize();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Initialize
    resize();
    animate();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && animationId) {
        cancelAnimationFrame(animationId);
      } else if (!document.hidden) {
        animate();
      }
    });
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ========================================
  // Initialize Everything
  // ========================================
  function init() {
    initMobileNav();
    initEvents();
    initScrollReveal();
    initActiveNav();
    initParticles();
    initSmoothScroll();

    // Remove loading state if any
    document.body.classList.add('loaded');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();