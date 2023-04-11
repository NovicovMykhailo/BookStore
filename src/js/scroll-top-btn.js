
let scrollToTopBtnEl = document.querySelector('.scroll-up-btn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtnEl.style.display = 'flex';
  } else {
    scrollToTopBtnEl.style.display = 'none';
  }
}

scrollToTopBtnEl.addEventListener('click', backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
