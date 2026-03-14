/* ============================================================
   PSC & AFD Provider Licensing Network — main.js
   Multi-page static site script
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Progress Bar ──────────────────────────────────── */
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
    }, { passive: true });
  }

  /* ── Sticky Header ────────────────────────────────────────── */
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    function updateHeader() {
      siteHeader.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* ── Mobile Nav Toggle ────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked (mobile)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  }

  /* ── Active Nav Link by data-page ────────────────────────── */
  (function setActiveNav() {
    const page = document.body.getAttribute('data-page');
    if (!page || !navMenu) return;

    const pageMap = {
      home:       'index.html',
      brands:     'brands.html',
      pricing:    'pricing.html',
      leadership: 'leadership.html',
      process:    'process.html',
      apply:      'apply.html'
    };

    const activeHref = pageMap[page];
    if (!activeHref) return;

    navMenu.querySelectorAll('a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === activeHref) {
        link.classList.add('active');
      } else {
        // Don't remove 'active' from nav-cta on non-apply pages —
        // the apply button is stylistically distinct, skip it
        if (!link.classList.contains('nav-cta')) {
          link.classList.remove('active');
        }
      }
    });
  })();

  /* ── Smooth Scroll (anchor links only) ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = siteHeader ? siteHeader.offsetHeight + 16 : 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── Reveal Animations (IntersectionObserver) ────────────── */
  (function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger unrevealed siblings in the same parent
          const parent = entry.target.parentElement;
          if (parent) {
            const pending = parent.querySelectorAll('.reveal:not(.visible)');
            pending.forEach(function (sibling, i) {
              setTimeout(function () {
                sibling.classList.add('visible');
              }, (i + 1) * 120);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) { observer.observe(el); });
  })();

  /* ── Hero Content Fade-in on Load ────────────────────────── */
  (function heroFadeIn() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    requestAnimationFrame(function () {
      setTimeout(function () {
        heroContent.classList.add('visible');
      }, 100);
    });
  })();

  /* ── FAQ Accordion ────────────────────────────────────────── */
  (function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const trigger = item.querySelector('.faq-question');
      const answer  = item.querySelector('.faq-answer');
      if (!trigger || !answer) return;

      trigger.setAttribute('aria-expanded', 'false');
      if (!trigger.getAttribute('role')) {
        trigger.setAttribute('role', 'button');
      }
      if (!trigger.getAttribute('tabindex')) {
        trigger.setAttribute('tabindex', '0');
      }

      function toggle() {
        const isOpen = item.classList.contains('open');

        // Close all other open items
        faqItems.forEach(function (other) {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            const otherAnswer  = other.querySelector('.faq-answer');
            const otherTrigger = other.querySelector('.faq-question');
            if (otherAnswer)  otherAnswer.style.maxHeight = '0';
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          answer.style.maxHeight = '0';
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      }

      trigger.addEventListener('click', toggle);
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  })();

  /* ── Apply Form Validation & Submission ───────────────────── */
  (function initApplyForm() {
    const form      = document.getElementById('applyForm');
    const successEl = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    function showError(fieldId, errorId, message) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      if (field) field.classList.add('error');
      if (error) {
        if (message) error.textContent = message;
        error.classList.add('visible');
      }
    }

    function clearError(fieldId, errorId) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      if (field) field.classList.remove('error');
      if (error) error.classList.remove('visible');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Live validation — clear error on input/change
    ['firstName','lastName','credentials','email','phone','location','specialty','tier'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('input',  function () { clearError(id, id + 'Error'); });
        el.addEventListener('change', function () { clearError(id, id + 'Error'); });
      }
    });

    document.querySelectorAll('input[name="brand"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var err = document.getElementById('brandError');
        if (err) err.classList.remove('visible');
      });
    });

    var consentCb = document.getElementById('consent');
    if (consentCb) {
      consentCb.addEventListener('change', function () { clearError('consent', 'consentError'); });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var firstName = document.getElementById('firstName');
      if (!firstName || !firstName.value.trim()) {
        showError('firstName', 'firstNameError'); valid = false;
      } else { clearError('firstName', 'firstNameError'); }

      var lastName = document.getElementById('lastName');
      if (!lastName || !lastName.value.trim()) {
        showError('lastName', 'lastNameError'); valid = false;
      } else { clearError('lastName', 'lastNameError'); }

      var credentials = document.getElementById('credentials');
      if (!credentials || !credentials.value.trim()) {
        showError('credentials', 'credentialsError'); valid = false;
      } else { clearError('credentials', 'credentialsError'); }

      var email = document.getElementById('email');
      if (!email || !validateEmail(email.value.trim())) {
        showError('email', 'emailError'); valid = false;
      } else { clearError('email', 'emailError'); }

      var phone = document.getElementById('phone');
      if (!phone || !phone.value.trim()) {
        showError('phone', 'phoneError'); valid = false;
      } else { clearError('phone', 'phoneError'); }

      var location = document.getElementById('location');
      if (!location || !location.value.trim()) {
        showError('location', 'locationError'); valid = false;
      } else { clearError('location', 'locationError'); }

      var specialty = document.getElementById('specialty');
      if (!specialty || !specialty.value) {
        showError('specialty', 'specialtyError'); valid = false;
      } else { clearError('specialty', 'specialtyError'); }

      var brandChecked = document.querySelectorAll('input[name="brand"]:checked');
      var brandError   = document.getElementById('brandError');
      if (!brandChecked.length) {
        if (brandError) brandError.classList.add('visible');
        valid = false;
      } else {
        if (brandError) brandError.classList.remove('visible');
      }

      var tier = document.getElementById('tier');
      if (!tier || !tier.value) {
        showError('tier', 'tierError'); valid = false;
      } else { clearError('tier', 'tierError'); }

      if (!consentCb || !consentCb.checked) {
        showError('consent', 'consentError'); valid = false;
      } else { clearError('consent', 'consentError'); }

      if (!valid) {
        var firstErrField = form.querySelector('.error');
        if (firstErrField) {
          firstErrField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrField.focus({ preventScroll: true });
        }
        return;
      }

      // Simulate async submission
      if (submitBtn) {
        submitBtn.disabled = true;
        var span = submitBtn.querySelector('span');
        if (span) span.textContent = 'Sending…';
      }

      setTimeout(function () {
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('visible');
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1200);
    });
  })();

  /* ── ROI Calculator ──────────────────────────────────────── */
  (function initROICalc() {
    var patientsEl = document.getElementById('roiPatients');
    var caseEl     = document.getElementById('roiCase');
    var acceptEl   = document.getElementById('roiAccept');
    if (!patientsEl || !caseEl || !acceptEl) return;

    var patientsValEl = document.getElementById('roiPatientsVal');
    var caseValEl     = document.getElementById('roiCaseVal');
    var acceptValEl   = document.getElementById('roiAcceptVal');
    var revenueEl     = document.getElementById('roiRevenue');
    var feeEl         = document.getElementById('roiFee');
    var savingsEl     = document.getElementById('roiSavings');
    var netEl         = document.getElementById('roiNet');
    var roiEl         = document.getElementById('roiROI');

    function fmt(n) {
      return '$' + Math.round(n).toLocaleString('en-US');
    }

    function calc() {
      var patients  = parseInt(patientsEl.value, 10);
      var avgCase   = parseInt(caseEl.value, 10);
      var accept    = parseInt(acceptEl.value, 10);

      if (patientsValEl) patientsValEl.textContent = patients + ' pts';
      if (caseValEl)     caseValEl.textContent     = fmt(avgCase) + ' USD';
      if (acceptValEl)   acceptValEl.textContent   = accept + '%';

      var annual     = patients * avgCase * (accept / 100) * 12;
      var licenseFee = annual * 0.03;
      var mktgSave   = 7200 * 12 * 0.6;
      var net        = annual - licenseFee + mktgSave;
      var roi        = licenseFee > 0 ? Math.round(((net - 25000) / 25000) * 100) : 0;

      if (revenueEl) revenueEl.textContent = fmt(annual);
      if (feeEl)     feeEl.textContent     = '−' + fmt(licenseFee);
      if (savingsEl) savingsEl.textContent = '+' + fmt(mktgSave);
      if (netEl)     netEl.textContent     = fmt(net);

      if (roiEl) {
        roiEl.textContent = (roi > 0 ? '+' : '') + roi + '%';
        roiEl.className = 'roi-result-val ' + (roi >= 0 ? 'roi-result-val--pos' : 'roi-result-val--neg');
      }
    }

    patientsEl.addEventListener('input', calc);
    caseEl.addEventListener('input', calc);
    acceptEl.addEventListener('input', calc);
    calc(); // initialise on load
  })();

  /* ── Marquee Pause on Hover ───────────────────────────────── */
  (function initMarquee() {
    var marquee = document.querySelector('.marquee-track');
    if (!marquee) return;
    marquee.addEventListener('mouseenter', function () {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', function () {
      marquee.style.animationPlayState = 'running';
    });
  })();

})();
