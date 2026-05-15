export function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  const toggleMobile = document.getElementById('dark-mode-toggle-mobile');
  const icon = toggle?.querySelector('i');
  const iconMobile = toggleMobile?.querySelector('i');

  function setTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
      if (iconMobile) { iconMobile.classList.remove('fa-sun'); iconMobile.classList.add('fa-moon'); }
      if (toggleMobile) toggleMobile.querySelector('span').textContent = 'Dark Mode';
    } else {
      document.body.classList.remove('light-mode');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
      if (iconMobile) { iconMobile.classList.remove('fa-moon'); iconMobile.classList.add('fa-sun'); }
      if (toggleMobile) toggleMobile.querySelector('span').textContent = 'Light Mode';
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  const saved = localStorage.getItem('theme');
  if (saved === 'light') setTheme(true);

  function toggleTheme() { setTheme(!document.body.classList.contains('light-mode')); }
  if (toggle) toggle.addEventListener('click', toggleTheme);
  if (toggleMobile) toggleMobile.addEventListener('click', toggleTheme);
}
