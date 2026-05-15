export function initScrollTop() {
  const fab = document.getElementById('scroll-top');
  if (!fab) return;
  window.addEventListener('scroll', () => fab.classList.toggle('visible', window.scrollY > 400), { passive: true });
  fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
