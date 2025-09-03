//* import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

export function slide(selector) {
  document.querySelectorAll(selector).forEach((root) => {
    //* Пропускаем уже инициализированные
    if (root.classList.contains('swiper-initialized')) return;

    //* Ищем общий контейнер для слайдера и кнопок
    const parent = root.parentElement;
    const nextEl = parent.querySelector('.navigation__next');
    const prevEl = parent.querySelector('.navigation__prev');

    new Swiper(root, {
      slidesPerView: 5,

      speed: 800,
      grabCursor: true,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        540: { slidesPerView: 2 },
        786: { slidesPerView: 3, spaceBetween: 16 },
        1025: { slidesPerView: 4, spaceBetween: 20 },
        1289: { slidesPerView: 5, spaceBetween: 30 },
      },
    });
  });
}
// export function mainSlide(Slide) {
//   if (Slide) {
//     new Swiper(Slide, {
//       effect: 'slide',
//       lazy: true,
//       autoplay: {
//         delay: 1500,
//         disableOnInteraction: true,
//       },
//       speed: 800,
//       spaceBetween: 5,
//       loop: true,
//       grabCursor: true,
//       centeredSlides: false,
//       pagination: {
//         el: '.slide__pagination',
//         clickable: true,
//       },
//       navigation: {
//         nextEl: '.slide__next',
//         prevEl: '.slide__prev',
//       },
//       breakpoints: {
//         0: { slidesPerView: 3 },
//         1140: { slidesPerView: 3 },
//         1440: { slidesPerView: 3 },
//       },

//       on: {
//         init: function () {
//           updateSlideCounter(this);
//         },
//         slideChange: function () {
//           updateSlideCounter(this);
//         },
//       },
//     });
//   }

//   function updateSlideCounter(swiperInstance) {
//     const realIndex = swiperInstance.realIndex + 1;
//     const totalSlides = swiperInstance.slides.length;
//     const counterElement = document.querySelector(
//       '.slide__count .slide__value'
//     );

//     if (counterElement) {
//       counterElement.textContent = `${realIndex} / ${totalSlides}`;
//     } else {
//       console.warn('Элемент .slider-bottom__count .value не найден');
//     }
//   }
// }
