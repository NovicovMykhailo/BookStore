// slick slider settings

// $(document).ready(function () {
//   $('.slider').slick({
//     slidesToShow: 4,
//     draggable: true,
//     vertical: true,
//     verticalSwiping: true,
// 		mobileFirst: true,
// 		waitForAnimate: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 6,
//         },
//       },
//     ]
//   });
// });

// swiper settings

const swiper = new Swiper('.swiper', {
	// direction: 'vertical',
	

  loop: true,
  // loopedSlides: 3,

  navigation: {
    nextEl: '.scroll-down-btn',
  },
  keyboard: {
    enabled: true,
    onlyInviewPort: true,
    pageUpDown: true,
  },
  slidesPerView: 4,
	spaceBetween: 20,
	speed: 250,

});
