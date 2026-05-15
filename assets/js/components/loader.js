export function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('hidden');
    }, 1800);
  });
}
