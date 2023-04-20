const refs = {
  navItem: document.querySelector('.nav__list').children[1],
  navItemMob: document.querySelector('.nav__mob-menu').children[0].children[1],
  signUpBtn: document.querySelector('.header__singup-btn'),
  signUpBtnMob: document.querySelector('.header__singup-btn-mob-menu'),
  UserBtn: document.querySelector('.header__singin-btn'),
//   logOutBtn: document.querySelector(''),
  logOutBtnMob: document.querySelector('.mob-menu__Log-out-btn'),
  //
};

refs.logOutBtnMob.style.display='none'
refs.UserBtn.style.display = 'none'
refs.navItem.style.display='none'
refs.navItemMob.style.display = 'none'
