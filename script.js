// Fade the page in once styles/DOM are ready (avoids a flash of unstyled content)
document.body.classList.add('loaded');

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Header background on scroll
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

const closeNav = () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navBackdrop.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navBackdrop.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});
navBackdrop.addEventListener('click', closeNav);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// Cursor glow (desktop only)
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
} else if (glow) {
  glow.style.display = 'none';
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Scrollspy — highlight the active nav link for the section in view
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
sections.forEach((section) => spyObserver.observe(section));

// Back to top button
const backToTop = document.getElementById('backToTop');
const toggleBackToTop = () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
};
toggleBackToTop();
window.addEventListener('scroll', toggleBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
