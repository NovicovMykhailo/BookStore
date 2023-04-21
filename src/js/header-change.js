

const refs = {
  navItem: document.querySelector('.nav__list').children[1],
  homeBtn: document.querySelector('.nav__list').children[0],
  navItemMob: document.querySelector('.nav__mob-menu').children[0].children[1],
  homeItemMob: document.querySelector('.nav__mob-menu').children[0].children[0],

  signUpBtn: document.querySelector('.header__singup-btn'),
  signUpBtnMob: document.querySelector('.header__singup-btn-mob-menu'),

  userBar: document.querySelector('.header__singin-btn'),
  userBarMob: document.querySelector('.user-info-bar'),

  logOutBtn: document.querySelector('.header__logout-btn'),
  logOutBtnMob: document.querySelector('.mob-menu__Log-out-btn'),
};

function notRegisteredView() {
  refs.logOutBtn.style.display = 'none';
  refs.userBar.style.display = 'none';
  refs.userBarMob.style.display = 'none';
  refs.logOutBtnMob.style.display = 'none';
  refs.userBar.style.display = 'none';
  refs.navItem.style.display = 'none';
  refs.navItemMob.style.display = 'none';
  refs.homeBtn.style.display = 'none';
  refs.homeItemMob.style.display = 'none';
}

export function registeredView() {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
        refs.signUpBtnMob.style.display = 'none';
  //userBar
  
  if (mediaQuery.matches) {
    refs.userBar.style.display = 'flex';
    refs.userBar.addEventListener('mouseenter', () => {
      refs.logOutBtn.style.display = 'flex';

      refs.logOutBtn.addEventListener('mouseleave', () => {
        refs.logOutBtn.style.display = 'none';
      });
    });
  } else if (!mediaQuery.matches){
    refs.userBar.style.display = 'none';

  }

  refs.userBarMob.style.display = 'inline-flex';
  refs.logOutBtnMob.style.display = 'flex';
  refs.homeBtn.style.display = 'block'
  refs.homeItemMob.style.display = 'flex';

  refs.navItem.style.display = 'block';
  refs.navItemMob.style.display = 'block';
  refs.signUpBtn.style.display = 'none';
}
notRegisteredView();

if (localStorage.getItem('register') !== null) {
  registeredView();
} else {
  notRegisteredView();
}
refs.logOutBtn.addEventListener('click', onLogoutClick);
refs.logOutBtnMob.addEventListener('click', onLogoutClick);

function onLogoutClick() {
  setTimeout(() => {
    localStorage.clear();

  }, 1000);
  setTimeout(() => {
    location.reload();

  }, 1000);

}
