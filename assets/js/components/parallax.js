export function initParallax() {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    document.querySelectorAll('.hero-bg-image').forEach(bg => {
      const section = bg.closest('.hero-section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      bg.style.transform = `translateY(${rect.top * 0.3}px) scale(1.1)`;
    });
  }, { passive: true });
}
