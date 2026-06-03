document.addEventListener('DOMContentLoaded', () => {
  // ── LOADER ──
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 800);

  // ── PHASE 2: DYNAMIC FOOTER YEAR ──
  const footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ── NAV SCROLL (PHASE 4: Passive listener) ──
  const nav = document.getElementById('mainNav');
  const onScroll = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 50); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── CUSTOM CURSOR (PHASE 6 & 7: Performance & Reduced Motion) ──
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!isTouchDevice && !prefersReducedMotion && cursor && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
    }, { passive: true });
    
    function animateRing() {
      ringX += (mouseX - ringX) * 0.14; ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    
    document.querySelectorAll('a, button, .glass-card, .skill-tag, .theme-nav-dot').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ── PHASE 2: ACTIVE SECTION AWARENESS (Applied to Main Nav) ──
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-10% 0px -60% 0px' });
  
  sections.forEach(section => navObserver.observe(section));

  // ── MOBILE MENU LOGIC ──
  const hamburgerBtn = document.getElementById('hamburger');
  const mobileMenuEl = document.getElementById('mobileMenu');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const menuLinks = mobileMenuEl?.querySelectorAll('[data-close-menu]');
  let scrollY = 0;
  
  function openMobileMenu() {
    if (!mobileMenuEl || !hamburgerBtn) return;
    scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll-top', `-${scrollY}px`);
    mobileMenuEl.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    setTimeout(() => mobileMenuEl.querySelector('a')?.focus(), 300);
    document.addEventListener('keydown', handleFocusTrap);
  }
  function closeMobileMenu() {
    if (!mobileMenuEl || !hamburgerBtn) return;
    mobileMenuEl.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.documentElement.style.removeProperty('--scroll-top');
    window.scrollTo(0, scrollY);
    hamburgerBtn?.focus();
    document.removeEventListener('keydown', handleFocusTrap);
  }
  function handleFocusTrap(e) {
    if (e.key !== 'Tab' || !mobileMenuEl.classList.contains('open')) return;
    const focusable = mobileMenuEl.querySelectorAll('a, button');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (hamburgerBtn) hamburgerBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openMobileMenu(); });
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeMobileMenu(); });
  menuLinks?.forEach(link => link.addEventListener('click', () => setTimeout(() => closeMobileMenu(), 100)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileMenuEl?.classList.contains('open')) closeMobileMenu(); });
  mobileMenuEl?.addEventListener('click', (e) => { if (e.target === mobileMenuEl) closeMobileMenu(); });

  // ═══════════════════════════════════════
  // PHASE 4 — PERFORMANCE ENGINE: Optimized Scroll Tracking
  // ═══════════════════════════════════════
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let scrollProgress = 0;
  let rafId = null;
  
  function updateScrollMetrics() {
    const currentY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    scrollVelocity = (currentY - lastScrollY) * 0.1 + scrollVelocity * 0.9;
    lastScrollY = currentY;
    
    scrollProgress = Math.min(1, Math.max(0, docHeight > 0 ? currentY / docHeight : 0));
    
    document.documentElement.style.setProperty('--scroll-velocity', scrollVelocity.toFixed(2));
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toFixed(3));
    
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.transform = `scaleX(${scrollProgress})`;
    }
    
    rafId = null;
  }
  
  function onScrollPerformance() {
    if (!rafId) {
      rafId = requestAnimationFrame(updateScrollMetrics);
    }
  }
  
  window.addEventListener('scroll', onScrollPerformance, { passive: true });
  updateScrollMetrics();

  // ═══════════════════════════════════════
  // PHASE 5 — MOTION SYSTEM: Scroll Velocity & Depth
  // ═══════════════════════════════════════
  function updateDepthLayers() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = docHeight > 0 ? Math.min(1, scrollY / docHeight) : 0;
    
    document.querySelectorAll('.depth-layer').forEach((layer, index) => {
      const intensity = (index + 1) * 5;
      const offset = scrollRatio * intensity;
      layer.style.setProperty('--depth-layer-1', `${offset}px`);
    });
  }
  
  let depthRaf = null;
  function throttledDepthUpdate() {
    if (!depthRaf) {
      depthRaf = requestAnimationFrame(() => {
        updateDepthLayers();
        depthRaf = null;
      });
    }
  }
  
  window.addEventListener('scroll', throttledDepthUpdate, { passive: true });
  updateDepthLayers();

  // ═══════════════════════════════════════
  // PHASE 6 — SECTION REVEAL ENGINE
  // ═══════════════════════════════════════
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });
  
  document.querySelectorAll('.story-chapter, .fade-in').forEach(el => {
    if (!el.classList.contains('visible')) {
      revealObserver.observe(el);
    }
  });

  // ═══════════════════════════════════════
  // PHASE 7 — MAGNETIC INTERACTIONS (Desktop Only)
  // ═══════════════════════════════════════
  if (!isTouchDevice && !prefersReducedMotion) {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
      let rect = null;
      let centerX = 0;
      let centerY = 0;
      
      el.addEventListener('mouseenter', (e) => {
        rect = el.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      });
      
      el.addEventListener('mousemove', (e) => {
        if (!rect) return;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
          const strength = 0.08;
          const offsetX = deltaX * strength;
          const offsetY = deltaY * strength;
          
          el.style.setProperty('--magnetic-offset-x', `${offsetX}px`);
          el.style.setProperty('--magnetic-offset-y', `${offsetY}px`);
          el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.setProperty('--magnetic-offset-x', '0px');
        el.style.setProperty('--magnetic-offset-y', '0px');
        rect = null;
      });
    });
  }

  // ── THEME NAV DOTS ──
  const themeDots = document.querySelectorAll('.theme-nav-dot');
  const heroSections = document.querySelectorAll('.hero-section');
  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(heroSections).indexOf(entry.target);
        themeDots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: 0.5 });
  heroSections.forEach(s => heroObserver.observe(s));

  // ── PHASE 6 & 7: CANVAS ANIMATIONS (Safe Mode, Respects Reduced Motion) ──
  function safeCanvasInit(canvasId, drawFn) {
    if (prefersReducedMotion) return;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    function resize() { const parent = canvas.parentElement; if (parent) { canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; } }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    try { drawFn(ctx, canvas, resize); } catch (err) { console.warn(`Canvas failed for ${canvasId}:`, err); }
  }

  safeCanvasInit('canvas-infra', (ctx, canvas) => {
    const particles = [];
    for (let i = 0; i < 60; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 2 + 0.5, alpha: Math.random() * 0.5 + 0.1, hue: 190 + Math.random() * 30 });
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(79,195,247,0.03)'; ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1; if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`; ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  });

  safeCanvasInit('canvas-malawi', (ctx, canvas) => {
    const trails = [];
    for (let i = 0; i < 20; i++) trails.push({ x: Math.random() * canvas.width, y: canvas.height * 0.6 + Math.random() * canvas.height * 0.4, speed: 0.5 + Math.random() * 1.5, width: 1 + Math.random() * 2, alpha: 0.1 + Math.random() * 0.25, color: Math.random() > 0.5 ? '#ffab40' : '#ffd54f' });
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grd = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.5, 0, canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5);
      grd.addColorStop(0, 'rgba(255,171,64,0.03)'); grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd; ctx.fillRect(0, 0, canvas.width, canvas.height);
      trails.forEach(trail => {
        trail.x += trail.speed; if (trail.x > canvas.width + 50) trail.x = -50;
        ctx.beginPath(); ctx.moveTo(trail.x, trail.y); ctx.lineTo(trail.x - 30 - trail.speed * 10, trail.y);
        ctx.strokeStyle = trail.color; ctx.globalAlpha = trail.alpha; ctx.lineWidth = trail.width; ctx.stroke(); ctx.globalAlpha = 1;
      });
      requestAnimationFrame(draw);
    }
    draw();
  });

  safeCanvasInit('canvas-creative', (ctx, canvas) => {
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;
      for (let w = 0; w < 3; w++) {
        ctx.beginPath(); const baseY = canvas.height * 0.3 + w * 70;
        const colors = ['rgba(179,136,255,0.12)', 'rgba(79,195,247,0.1)', 'rgba(255,171,64,0.08)'];
        ctx.strokeStyle = colors[w]; ctx.lineWidth = 1.5;
        for (let x = 0; x < canvas.width; x += 5) {
          const freq1 = Math.sin(x * 0.008 + time * (1.2 + w * 0.3)) * 30;
          const freq2 = Math.sin(x * 0.015 + time * 1.8 + w) * 15;
          const y = baseY + freq1 + freq2;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    draw();
  });

  safeCanvasInit('canvas-eng', (ctx, canvas) => {
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(105,240,174,0.04)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      const scanY = (Date.now() * 0.05) % canvas.height;
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(canvas.width, scanY);
      ctx.strokeStyle = 'rgba(105,240,174,0.06)'; ctx.lineWidth = 1; ctx.stroke();
      requestAnimationFrame(draw);
    }
    draw();
  });

  // ── PARALLAX EFFECT (PHASE 6: Passive listener) ──
  const parallaxBgs = document.querySelectorAll('.hero-bg-image');
  const onParallaxScroll = () => {
    const scrollY = window.scrollY;
    parallaxBgs.forEach(bg => {
      const section = bg.closest('.hero-section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) bg.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
    });
  };
  window.addEventListener('scroll', onParallaxScroll, { passive: true });
  onParallaxScroll();

  // ═══════════════════════════════════════
  // PHASE 11 — RESPONSIVE GUARANTEE: Viewport Stability
  // ═══════════════════════════════════════
  function ensureViewportStability() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    document.documentElement.style.setProperty('--100vw', `${vw}px`);
  }
  
  window.addEventListener('resize', ensureViewportStability, { passive: true });
  ensureViewportStability();
  
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--section-reveal-offset', '0px');
    document.querySelectorAll('.depth-layer').forEach(layer => {
      layer.style.transform = 'none';
    });
  }

  // ── CLEANUP ──
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      if (depthRaf) cancelAnimationFrame(depthRaf);
    }
  });
  
  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (depthRaf) cancelAnimationFrame(depthRaf);
    navObserver.disconnect();
    revealObserver.disconnect();
    heroObserver.disconnect();
  });
});
