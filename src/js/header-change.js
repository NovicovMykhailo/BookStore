const refs = {
  navItem: document.querySelector('.nav__list').children[1],
  navItemMob: document.querySelector('.nav__mob-menu').children[0].children[1],

  signUpBtn: document.querySelector('.header__singup-btn'),
  signUpBtnMob: document.querySelector('.header__singup-btn-mob-menu'),

  userBar: document.querySelector('.header__singin-btn'),
  userBarMob: document.querySelector('.user-info-bar'),

  logOutBtn: document.querySelector('.header__logout-btn'),
  logOutBtnMob: document.querySelector('.mob-menu__Log-out-btn'),
  //
};

function notRegisteredView() {
  refs.logOutBtn.style.display = 'none';
  refs.userBar.style.display = 'none';
  refs.userBarMob.style.display = 'none';
    refs.signUpBtn.style.display = 'flex'
  refs.logOutBtnMob.style.display = 'none';

  refs.userBar.style.display = 'none';
  refs.navItem.style.display = 'none';
  refs.navItemMob.style.display = 'none';
}

function hoverOnUserBar() {
  refs.userBar.addEventListener('mouseenter', () => {
    refs.logOutBtn.style.display = 'flex';

    refs.logOutBtn.addEventListener('mouseleave', () => {
      refs.logOutBtn.style.display = 'none';
    });
  });
}


function registeredView() {
    refs.signUpBtnMob.style.display = 'none';
    // refs.userBar.stle.display = 'flex';

    if (window.matchMedia('(max-width: 700px)')) {
      
    refs.userBar.style.display = 'flex';
    refs.userBar.addEventListener('mouseenter', () => {
      refs.logOutBtn.style.display = 'flex';

      refs.logOutBtn.addEventListener('mouseleave', () => {
        refs.logOutBtn.style.display = 'none';
      });
    });
    }



  refs.navItem.style.display = 'block';
  refs.navItemMob.style.display = 'block';
  refs.signUpBtn.style.display = 'none';
}
notRegisteredView();
registeredView();
