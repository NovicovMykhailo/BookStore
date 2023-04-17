export function MobileMenu() {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const menuIcon = document.querySelector('#menu-icon');

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    if (isMenuOpen) {
      menuIcon.setAttribute('href', './images/svg-sprite.svg#ham-menu-icon');
      document.body.classList.remove('no-scroll'); // дозволяємо прокручування
    } else {
      menuIcon.setAttribute('href', './images/svg-sprite.svg#x-close-icon');
      document.body.classList.add('no-scroll'); // блокуємо прокручування
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const handleOrientationChange = e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    menuIcon.setAttribute('href', './images/svg-sprite.svg#ham-menu-icon');
    document.body.classList.remove('no-scroll'); // дозволяємо прокручування
  };
  mediaQuery.addListener(handleOrientationChange);

  return {
    toggleMenu,
    destroy: () => {
      openMenuBtn.removeEventListener('click', toggleMenu);
      mediaQuery.removeListener(handleOrientationChange);
    },
  };
}

MobileMenu();
