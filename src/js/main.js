import '../scss/main.scss';
import loaded from './assets/preloader.js';
import { counterProduct } from './components/counter.js';

document.addEventListener('DOMContentLoaded', () => {
  counterProduct();
});
// todo - [ Assets ] -
//* - [Slide] -
import { buildSwiper } from './layouts/build-swiper.js';
buildSwiper();

import { slide } from './components/slide.js';
slide('.product-slide');
// import { smoother } from './animations/animations.jsx';
// import { validateForm } from './assets/validate-form.js';
import { dynamicAdaptive } from './assets/dynamic-adaptive.js';
// import { anchorsSmoothScrolling } from './assets/anchors-smooth-scrolling.js';

import {
  addFavorites,
  sidebarMenuHandle,
  //   animateHeader,
  //   smoothScrollTitle,
  //   fadeInItem,
  //   fadeInBlock,
  //   fadeInColumn,
  //   fadeInItemLeft,
  //   fadeInItemRight,
  // } from './animations/anime-js.jsx';
  // import {
  //   maskPhone,
  //   cookiesAccept,
  //   shadowScrollHeader,
  //   toggleModal,
  //   lineMarquee,
} from './layouts/layouts.js';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
loaded('.preloader');
// validateForm();
addFavorites('.product-card__favourites');
sidebarMenuHandle();
dynamicAdaptive();
// fadeInColumn('.its-col');
// fadeInBlock('.its-block');
// fadeInItem('.its-el');
// fadeInItemLeft('.its-el-left');
// fadeInItemRight('.its-el-right');
// smoothScrollTitle('.el-item');
// animateHeader();
// anchorsSmoothScrolling();
// shadowScrollHeader();
// toggleModal();
if (!isMobile) {
  // smoother();
}

// document.addEventListener('DOMContentLoaded', () => {
//   cookiesAccept('.cookies-accept', '.cookies-accept__button');
//   lineMarquee('.running-line__marquee');
//   maskPhone('.phone');
// });

//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
