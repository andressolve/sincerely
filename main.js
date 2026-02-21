// ===== SINCERELY KITCHEN — GLOBAL JS =====

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal, .fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Trigger hero fade-ups immediately
setTimeout(() => {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
}, 100);

// FAQ accordion icon rotation
document.querySelectorAll('.faq-item').forEach(d => {
  d.addEventListener('toggle', () => {
    const icon = d.querySelector('.faq-icon');
    if (icon) icon.textContent = d.open ? '−' : '+';
  });
});
