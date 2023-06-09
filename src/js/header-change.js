import {showLoadingIndicator} from './loader'

const reloadDelay = 2500;

const refs = {
  logOutBtn: document.querySelector('.header__singin-btn'),
  logOutBtnMob: document.querySelector('.mob-menu__Log-out-btn'),
};

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
  showLoadingIndicator()

  setTimeout(() => {
    localStorage.clear();
  }, reloadDelay);
  setTimeout(() => {
    location.reload();
  }, reloadDelay);
}
