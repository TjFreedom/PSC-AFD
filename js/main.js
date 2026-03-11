/* ============================================================
   PSC / AFD Provider Licensing Site — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky nav ───────────────────────────────────────────── */
  const header = document.getElementById('site-header');

  function updateNav() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile nav toggle ────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ── Smooth scroll for anchor links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── Scroll animations (Intersection Observer) ────────────── */
  const fadeEls = document.querySelectorAll(
    '.brand-card, .benefit-card, .team-card, .process-step, ' +
    '.testimonial-card, .faq-item, .included-category, .ideal-check, ' +
    '.section-header, .founder-quote, .upload-card'
  );

  // Add fade-in class
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)'));
          const myIdx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(myIdx * 80, 400));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));

  /* ── FAQ accordion ────────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Active nav link on scroll ───────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - header.offsetHeight - 80;
      if (window.scrollY >= sectionTop) {
        current = '#' + section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === current) {
        link.classList.add('active-nav');
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Apply form validation & submit ──────────────────────── */
  const form      = document.getElementById('apply-form');
  const submitBtn = document.getElementById('submit-btn');
  const success   = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

      let valid = true;
      const required = form.querySelectorAll('[required]');

      required.forEach(field => {
        const val = field.value.trim();

        if (field.type === 'checkbox') {
          if (!field.checked) {
            markError(field);
            valid = false;
          }
        } else if (!val) {
          markError(field);
          valid = false;
        } else if (field.type === 'email' && !isValidEmail(val)) {
          markError(field);
          valid = false;
        }
      });

      // At least one brand checkbox
      const brandChecks = form.querySelectorAll('[name="brand_interest"]');
      const anyBrand = Array.from(brandChecks).some(c => c.checked);
      if (!anyBrand) {
        brandChecks.forEach(c => markError(c));
        valid = false;
      }

      if (!valid) {
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      // Simulate submission
      submitBtn.textContent = 'Submitting…';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1200);
    });

    // Remove error on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
      field.addEventListener('change', () => field.classList.remove('error'));
    });
  }

  function markError(field) {
    field.classList.add('error');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Stats counter animation ─────────────────────────────── */
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const statNums = statsEl.querySelectorAll('.stat-num');
    let animated = false;

    const statObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        statNums.forEach(num => {
          num.style.opacity = '0';
          num.style.transform = 'translateY(12px)';
          num.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          setTimeout(() => {
            num.style.opacity = '1';
            num.style.transform = 'translateY(0)';
          }, 200 + Array.from(statNums).indexOf(num) * 150);
        });
      }
    }, { threshold: 0.5 });

    statObserver.observe(statsEl);
  }

  /* ── Reveal hero on load ─────────────────────────────────── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s';
    window.addEventListener('load', () => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  }

})();
