import mobToggleIcon from '../images/svg-sprite.svg'


export function MobileMenu() {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const menuIcon = document.querySelector('#menu-icon');
  const mobileBG = document.querySelector('.wrapper');

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    if (isMenuOpen) {
      menuIcon.setAttribute('href', `${mobToggleIcon}#ham-menu-icon`);
      document.body.classList.remove('no-scroll');
      mobileBG.classList.remove('.visually-hiddn')
    } else {
      menuIcon.setAttribute('href', `${mobToggleIcon}#x-close-icon`);
      document.body.classList.add('no-scroll');
        mobileBG.classList.add('.visually-hiddn');
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);

  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const handleOrientationChange = e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    menuIcon.setAttribute('href', `${mobToggleIcon}#ham-menu-icon`);
    document.body.classList.remove('no-scroll');
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
