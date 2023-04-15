$(document).ready(function () {
  $('.slider').slick({
    slidesToShow: 4,
    draggable: true,
    vertical: true,
    verticalSwiping: true,
		mobileFirst: true,
		waitForAnimate: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
        },
      },
    ]
  });
});
