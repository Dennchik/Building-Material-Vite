import '../scss/main.scss';
import { buildSwiper } from './utils/build-swiper.js';
import { slide, slidNews } from './components/slide.js';

import { maskPhone } from './assets/phone-mask.js';
document.addEventListener('DOMContentLoaded', () => {
  maskPhone('.phone');
});
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
import { validateForm } from './assets/validate-form.js';
validateForm();
//* layouts
import {
  addFavorites,
  sidebarMenuHandle,
  hideTopMenu,
  addToBlock,
  cookiesAccept,
  toggleModalOpen,
} from './layouts/layouts.js';
addToBlock();
cookiesAccept('.cookies-accept', '.cookies-accept__button');
import {
  dropDownMenu,
  collapseToggle,
  collapseToggleOne,
} from './modules/drop-menu.js';

dropDownMenu('.main-menu__link');
document.addEventListener('DOMContentLoaded', () => {
  toggleModalOpen();
  counterProduct();
  hideTopMenu();
  collapseToggle();
  collapseToggleOne();
  addFavorites('.product-card__favourites');
  sidebarMenuHandle();
  dynamicAdaptive();
});

document.querySelectorAll('.product-card__label').forEach((priceBlock) => {
  const span = priceBlock.querySelector('span');

  if (!span || !span.textContent.trim()) {
    priceBlock.style.display = 'none';
  }
});

// const isMobile = /Mobi|Android/i.test(navigator.userAgent);
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

//🔹 Если Pug компилируется через Vite плагин, то productsMap можно прокинуть в шаблон:
// import productsMap from '../data/productsMap.json';

// export const templateData = {
//   productsMap,
// };

// console.log('productsMap keys:', Object.keys(productsMap));
//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
