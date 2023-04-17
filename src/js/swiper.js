// import Swiper from 'swiper';
// import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  loop: true,
  direction: 'vertical',

  navigation: {
    nextEl: '.support__load-more',
  },

  keyboard: {
    enabled: true,
    onlyInviewPort: true,
    pageUpDown: true,
  },

  simulateTouch: false,
  slidesPerGroup: 1,
  spaceBetween: 20,
  speed: 250,

  slidesPerView: 6,

  // breakpoints: {
  //   768: {
  //     ,
  //   },
  //   1100: {
  //     slidesPerView: 6,
  //   },
  // },
});
