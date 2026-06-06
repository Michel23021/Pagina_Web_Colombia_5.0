// =============================================
// COLOMBIA 5.0 — Main JavaScript
// =============================================

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── Language toggle for conference summaries ──
document.querySelectorAll('.lang-toggle').forEach(toggle => {
  const parent = toggle.closest('.conf-summary') || toggle.closest('.conf-body');
  toggle.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggle.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      if (parent) {
        parent.querySelectorAll('.summary-es, .summary-en').forEach(el => el.classList.add('hidden'));
        parent.querySelectorAll(`.summary-${lang}`).forEach(el => el.classList.remove('hidden'));
      }
    });
  });
});

// ── Glossary live search ──
const searchInput = document.getElementById('gloss-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.gloss-table tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Scroll reveal animation ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.obj-card, .stat, .conf-block, .ethics-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ── Add reveal styles dynamically ──
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(style);
