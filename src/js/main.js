import '../scss/main.scss';
import { buildSwiper } from './utils/build-swiper.js';
import { slide, slidNews } from './components/slide.js';

buildSwiper();

document.addEventListener('DOMContentLoaded', () => {
  slide('.product-slide');
  slidNews('.slide-news');
});

//* - [Utils] -
import { loadedTimer } from './utils/loaded-timer.js';
loadedTimer();

//* - [ Animation ] -
import { addCartAnimation } from './animations/add-cart-animation.jsx';
addCartAnimation(
  '.favourites',
  '.product-card__favourites',
  '.icon-heart-like',
  '.icon-heart-like',
  'like'
);

//* - [ Components ] -
import { counterProduct } from './components/counter.js';
import { dynamicAdaptive } from './modules/dynamic-adaptive.js';

//🔹 Если Pug компилируется через Vite плагин, то productsMap можно прокинуть в шаблон:
// import productsMap from '../data/productsMap.json';
// export const templateData = {
//   productsMap,
// };

//* layouts
import {
  addFavorites,
  sidebarMenuHandle,
  hideTopMenu,
  addToBlock,
} from './layouts/layouts.js';
addToBlock();

import {
  dropDownMenu,
  collapseToggle,
  collapseToggleOne,
} from './modules/drop-menu.js';

dropDownMenu('.main-menu__link');
document.addEventListener('DOMContentLoaded', () => {
  counterProduct();
  hideTopMenu();
  collapseToggle();
  collapseToggleOne();
  addFavorites('.product-card__favourites');
  sidebarMenuHandle();
  dynamicAdaptive();
});

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
// validateForm();
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

//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------

const header = document.querySelector('.page__header');
const menuFloat = document.querySelector('.menu-float');
function goodBye() {
  window.addEventListener('scroll', () => {
    let rectHeader = header.getBoundingClientRect();
    let rectFloat = menuFloat.getBoundingClientRect();
    let heightOffset = rectHeader.height + rectFloat.height;
    // console.log(heightOffset);
  });
  function sayHello() {}
  return sayHello;
}
let sayGoodBye = goodBye();

sayGoodBye();
