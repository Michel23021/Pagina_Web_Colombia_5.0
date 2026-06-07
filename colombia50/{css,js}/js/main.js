// ─── LANGUAGE TOGGLE ───
let currentLang = 'es';

function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  const btn = document.getElementById('langBtn');
  btn.textContent = currentLang === 'es' ? 'EN' : 'ES';

  document.querySelectorAll('[data-lang-es]').forEach(el => {
    el.textContent = currentLang === 'es' ? el.dataset.langEs : el.dataset.langEn;
  });

  document.querySelectorAll('.es-content').forEach(el => {
    el.style.display = currentLang === 'es' ? 'block' : 'none';
  });
  document.querySelectorAll('.en-content').forEach(el => {
    el.style.display = currentLang === 'en' ? 'block' : 'none';
  });
}

// ─── LIGHTBOX ───
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.classList.add('open');
  });
});

document.getElementById('lightboxClose').addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

// ─── GLOSSARY SEARCH ───
const glossarySearch = document.getElementById('glossarySearch');
if (glossarySearch) {
  glossarySearch.addEventListener('input', function() {
    const q = this.value.toLowerCase();
    document.querySelectorAll('.gloss-row').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── ACTIVE NAV ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
});
