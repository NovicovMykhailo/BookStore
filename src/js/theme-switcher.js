const themeSwitch = document.querySelector('.theme-switch');
const body = document.querySelector('body');

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', function() {
  if (this.checked) {
    localStorage.setItem('theme', 'dark');
    body.classList.add('dark-theme');
  } else {
    localStorage.setItem('theme', 'light');
    body.classList.remove('dark-theme');
  }
});

