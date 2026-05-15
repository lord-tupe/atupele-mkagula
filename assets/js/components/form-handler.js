export function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Message Sent <i class="fas fa-check text-xs"></i>';
    btn.style.background = 'linear-gradient(135deg, #69f0ae, #00c853)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      this.reset();
    }, 2500);
  });
}
