const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: true,
  navigation: {
    nextEl: '.support__load-more',
  },
  // keyboard: {
  //   enabled: true,
  //   onlyInviewPort: true,
  //   pageUpDown: true,
  // },
  simulateTouch: false,
  slidesPerGroup: 1,

  spaceBetween: 20,
  speed: 250,

  breakpoints: {
    0: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 4,
    },
  },
});
