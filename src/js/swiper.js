import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
// import 'swiper/css';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Scrollbar],
  loop: true,
  direction: 'vertical',
  // navigation: {
  //   nextEl: '.support__load-more',
  // },
  // keyboard: {
  //   enabled: true,
  //   onlyInviewPort: true,
  //   pageUpDown: true,
  // },
  // simulateTouch: false,
  // slidesPerGroup: 1,
  // spaceBetween: 20,
  // speed: 250,
  // slidesPerView: 6,
});

// breakpoints: {
//   768: {
//     ,
//   },
//   1100: {
//     slidesPerView: 6,
//   },
// },
