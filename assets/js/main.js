import { initLoader } from './components/loader.js';
import { initCursor } from './components/cursor.js';
import { initNavigation } from './components/navigation.js';
import { initDarkMode } from './components/dark-mode.js';
import { initScrollTop } from './components/scroll-top.js';
import { initRipple } from './components/ripple.js';
import { initThemeNav } from './components/theme-nav.js';
import { initFadeObserver } from './components/fade-observer.js';
import { initHeroCanvas } from './components/hero-canvas.js';
import { initMusicViz } from './components/music-viz.js';
import { initForm } from './components/form-handler.js';
import { initSmoothScroll } from './components/smooth-scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavigation();
  initDarkMode();
  initScrollTop();
  initRipple();
  initThemeNav();
  initFadeObserver();
  initHeroCanvas();
  initMusicViz();
  initForm();
  initSmoothScroll();
});
