const refs = {
  logOutBtn: document.querySelector('.header__singin-btn'),
  logOutBtnMob: document.querySelector('.mob-menu__Log-out-btn'),
  //   header__singin-btn
};

const reloadDelay = 1000;

if (localStorage.getItem('register') !== null) {
  document.body.classList.add('is-registered');
  document.body.classList.remove('not-registered');
} else {
  if (document.body.classList.contains('is-registered')) {
    document.body.classList.remove('is-registered');
  }
  if (!document.body.classList.contains('not-registered')) {
    document.body.classList.add('not-registered');
  }
}

refs.logOutBtn.addEventListener('click', onLogoutClick);
refs.logOutBtnMob.addEventListener('click', onLogoutClick);

function onLogoutClick() {
  setTimeout(() => {
    localStorage.clear();
  }, reloadDelay);
  setTimeout(() => {
    location.reload();
  }, reloadDelay);
}
