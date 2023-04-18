import Swiper, {
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
  Keyboard,
  Grid,
  Zoom,
  Controller,
  A11y,
  Thumbs,
} from 'swiper';

const swiper = new Swiper('.swiper', {
  modules: [
    Navigation,
    Pagination,
    Scrollbar,
    Keyboard,
    Grid,
    Zoom,
    Controller,
    A11y,
    Thumbs,
  ],

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
  slidesPerView: 5,
});

// breakpoints: {
//   768: {
//     ,
//   },
//   1100: {
//     slidesPerView: 6,
//   },
// },
