/* ═══════════════════════════════════════
   THE ILS NETWORK — SCRIPTS
   theILSnetwork.com
   ═══════════════════════════════════════ */

// ── Nav: frosted glass on scroll ──
const nav = document.getElementById('nav');
const handleScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ── Mobile menu ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll-reveal animations ──
const revealObserver = new IntersectionObserver(
  entries => entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));

// ── Stagger pillar cards ──
document.querySelectorAll('.pillar-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ── Smooth-scroll for anchor links (accounts for fixed nav height) ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
});

// ── Contact form ──
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form && formStatus) {
  form.addEventListener('submit', async e => {
    const action = form.getAttribute('action') || '';

    // Guard: Formspree not yet configured
    if (action.includes('YOUR_FORM_ID')) {
      e.preventDefault();
      setStatus(
        'Form not yet connected. Sign up at formspree.io, create a form, and replace YOUR_FORM_ID in index.html.',
        'info'
      );
      return;
    }

    // Live submission via fetch (no page reload)
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('Message sent! We\'ll be in touch soon.', 'success');
        form.reset();
      } else {
        setStatus('Something went wrong. Please email us directly.', 'error');
      }
    } catch {
      setStatus('Network error. Please try again or email us directly.', 'error');
    } finally {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}

function setStatus(text, type) {
  const colors = {
    success: { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  color: '#86efac' },
    error:   { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  color: '#fca5a5' },
    info:    { bg: 'rgba(68,129,235,0.1)', border: 'rgba(68,129,235,0.3)', color: '#93b8ff' },
  };
  const c = colors[type] || colors.info;
  Object.assign(formStatus.style, {
    background: c.bg,
    border: `1px solid ${c.border}`,
    color: c.color,
  });
  formStatus.textContent = text;
}
