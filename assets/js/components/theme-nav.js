export function initThemeNav() {
  const themeDots = document.querySelectorAll('.theme-nav-dot');
  if (themeDots.length === 0) return;
  const trackedSections = ['hero', 'about', 'skills', 'projects', 'contact'];
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = trackedSections.indexOf(entry.target.id);
        if (idx !== -1) themeDots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.4 });
  trackedSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) heroObserver.observe(el);
  });
  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
