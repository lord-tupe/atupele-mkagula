export function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  const pts = [];
  const COUNT = 70;
  for (let i = 0; i < COUNT; i++) {
    pts.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 2 + 0.5, alpha: Math.random() * 0.4 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(79,195,247,0.025)'; ctx.lineWidth = 1;
    const gs = 50;
    for (let x = 0; x < canvas.width; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
    for (let y = 0; y < canvas.height; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,195,247,${p.alpha})`; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j]; const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 140) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(79,195,247,${0.05 * (1 - d/140)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
    const t = Date.now() * 0.001;
    for (let w = 0; w < 3; w++) {
      ctx.beginPath(); ctx.strokeStyle = `rgba(79,195,247,${0.06 + Math.sin(t + w) * 0.03})`; ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height * 0.25 + Math.sin(x * 0.004 + t + w * 1.2) * 60 + w * 70;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
}
