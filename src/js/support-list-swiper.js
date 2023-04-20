// import Swiper
import Swiper, { Mousewheel, Navigation } from 'swiper';
// import Swiper styles
import 'swiper/swiper.scss';

const swiper = new Swiper('.swiper', {
  modules: [Mousewheel, Navigation],
  createElements: true,
  direction: 'vertical',
  navigation: {
    nextEl: '.swiper-button-next',
  },
  rewind: true,
  mousewheel: true,
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
