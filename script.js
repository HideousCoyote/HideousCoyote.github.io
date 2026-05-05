/* ============================================================
   ABOUT ME WEBSITE — script.js
   Handles: scroll reveal, navbar, mobile menu, year footer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. FOOTER YEAR ──────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── 2. NAVBAR SCROLL EFFECT ─────────────────────────── */
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load


  /* ── 3. MOBILE HAMBURGER MENU ────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });


  /* ── 4. SCROLL REVEAL (Intersection Observer) ────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings inside the same parent
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          siblings.forEach((el, idx) => {
            setTimeout(() => el.classList.add('visible'), idx * 80);
          });
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 5. ACTIVE NAV LINK (highlights current section) ─── */
  const sections  = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));


  /* ── 6. TIMELINE STAGGER ANIMATION ──────────────────── */
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.index || 0) * 150;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  timelineItems.forEach(item => timelineObserver.observe(item));


  /* ── 7. SMOOTH SCROLL FALLBACK ───────────────────────── */
  // Covers browsers that don't support CSS scroll-behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 20 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});