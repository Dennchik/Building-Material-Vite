import '../scss/main.scss';
import loaded from './utils/preloader.js';
import { counterProduct } from './components/counter.js';
import { addCartAnimation } from './animations/add-cart-animation.jsx';

addCartAnimation(
  '.favourites',
  '.product-card__favourites',
  '.icon-heart-like',
  '.icon-heart-like',
  'like'
);

// todo - [ Assets ] -
//* - [Slide] -
import { buildSwiper } from './utils/build-swiper.js';
buildSwiper();

import { slide } from './components/slide.js';
slide('.product-slide');
// import { smoother } from './animations/animations.jsx';
// import { validateForm } from './assets/validate-form.js';
import { dynamicAdaptive } from './modules/dynamic-adaptive.js';
// import { anchorsSmoothScrolling } from './assets/anchors-smooth-scrolling.js';

import {
  addFavorites,
  sidebarMenuHandle,
  hideTopMenu,
} from './layouts/layouts.js';

document.addEventListener('DOMContentLoaded', () => {
  counterProduct();
  hideTopMenu();
});
// hideTopMenu('.header__content');
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
