const swiper = new Swiper('.swiper', {
  direction: 'vertical',

  loop: true,
  navigation: {
    nextEl: '.scroll-down-btn',
  },

  keyboard: {
    enabled: true,
    onlyInviewPort: true,
    pageUpDown: true,
  },

  slidesPerView: 4,
  // spaceBetween: 20,
  speed: 250,
});
