import Swiper, {
  Keyboard,
  Navigation,
  Scrollbar,
  Grid,
  Zoom,
  Controller,
  A11y,
  Thumbs,
} from 'swiper';

const swiper = new Swiper('.swiper', {
  modules: [
    Keyboard,
    Navigation,
    Scrollbar,
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
  spaceBetween: 20,
  speed: 250,
  slidesPerView: 4,

  // breakpoints: {
  //   768: {
  //     slidesPerView: 6,
  //   },
  // },
});
