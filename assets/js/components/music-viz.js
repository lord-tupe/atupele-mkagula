export function initMusicViz() {
  const container = document.getElementById('musicViz');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const bar = document.createElement('div');
    bar.className = 'viz-bar';
    bar.style.setProperty('--bar-height', (8 + Math.random() * 45) + 'px');
    bar.style.animationDelay = (Math.random() * 1.5) + 's';
    bar.style.animationDuration = (0.6 + Math.random() * 0.8) + 's';
    container.appendChild(bar);
  }
}
