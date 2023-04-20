// import Swiper
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper.scss';
// імпортуємо масив компаній
import { supportCompanies } from './support-data.js';

const supportBtn = document.querySelector('.swiper-button-next');

const swiper = new Swiper('.swiper', {
  createElements: true,
  direction: 'vertical',
  navigation: {
    nextEl: '.swiper-button-next',
  },
  mousewheel: true,
  rewind: true,
  allowTouchMove: false,
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
onToggleBtn();
if (swiper.isBeginning || swiper.isEnd) {
 supportBtn.classList.toggle('swiper-button-next--rotated');
}
}

function onToggleBtn () {
    const toggledBtn = supportBtn.classList.contains('swiper-button-next--rotated');
    if (supportCompanies.length < swiper.params.slidesPerGroup && toggledBtn) {
        supportBtn.classList.remove('swiper-button-next--rotated');
        supportBtn.addEventListener('click', onBtnClick);
    }
    supportBtn.removeEventListener('click', onBtnClick);
    supportBtn.addEventListener('click', onBtnClick);
}