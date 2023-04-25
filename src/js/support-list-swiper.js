// import Swiper
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper.scss';

const supportBtn = document.querySelector('.swiper-button-next');

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  navigation: {
    nextEl: '.swiper-button-next',
  },
  rewind: true,
  allowTouchMove: true,
  spaceBetween: 20,
  slidesPerView: 'auto',
  slidesPerGroup: 4,
    breakpoints: {
    768: {
      slidesPerGroup: 6,
    },
  },
});

supportBtn.addEventListener('click', onBtnClick);

function onBtnClick () {
swiper.slideNext();
if (swiper.isEnd) {
 supportBtn.classList.add('swiper-button-next--rotated');
}
else if (swiper.isBeginning) {
  supportBtn.classList.remove('swiper-button-next--rotated');
}
}