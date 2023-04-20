
// console.log('isLogged', isLogged)

const refs = {
  navItem: document.querySelector('.nav__list').children[1],
  navItemMob: document.querySelector('.nav__mob-menu').children[0].children[1],

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
}


export function registeredView() {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    //userBar
    if (mediaQuery.matches) {
      refs.userBar.style.display = 'flex';
      refs.userBar.addEventListener('mouseenter', () => {
        refs.logOutBtn.style.display = 'flex';

        refs.logOutBtn.addEventListener('mouseleave', () => {
          refs.logOutBtn.style.display = 'none';
        });
      });
    }
    refs.userBarMob.style.display = "inline-flex"
    refs.signUpBtnMob.style.display = 'none'
    refs.logOutBtnMob.style.display = 'flex'



  refs.navItem.style.display = 'block';
  refs.navItemMob.style.display = 'block';
  refs.signUpBtn.style.display = 'none';
}
notRegisteredView();

if (localStorage.getItem('register') !== null || isLogged === true) {
  registeredView();
} else if (isLogged === false) {
  notRegisteredView();
}
refs.logOutBtn.addEventListener('click', onLogoutClick)
refs.logOutBtnMob.addEventListener('click', onLogoutClick);


function onLogoutClick() {
    isLogged = false;
    localStorage.clear();
    location.reload();
 
}