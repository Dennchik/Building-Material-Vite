import '../scss/main.scss';
import { buildSwiper } from './utils/build-swiper.js';
import { slide, slidNews } from './components/slide.js';
import { maskPhone } from './assets/mask-phone.js';
import { loadedTimer } from './utils/loaded-timer.js';
import { addCartAnimation } from './animations/add-cart-animation.jsx';
import { counterProduct } from './components/counter.js';
import { dynamicAdaptive } from './modules/dynamic-adaptive.js';
import { validateForm } from './assets/validate-form.js';
import {
  addFavorites,
  sidebarMenuHandle,
  hideTopMenu,
  addToBlock,
  cookiesAccept,
  toggleModalOpen,
} from './layouts/layouts.js';
import {
  dropDownMenu,
  collapseToggle,
  collapseToggleOne,
} from './modules/drop-menu.js';

buildSwiper();

document.addEventListener('DOMContentLoaded', () => {
  slide('.product-slide');
  slidNews('.slide-news');
  maskPhone('.phone');
});

//* - [Utils] -
loadedTimer();

//* - [ Animation ] -
addCartAnimation(
  '.favourites',
  '.product-card__favourites',
  '.icon-heart-like',
  '.icon-heart-like',
  'like'
);

//* - [ Components ] -
validateForm();
//* layouts
addToBlock();
cookiesAccept('.cookies-accept', '.cookies-accept__button');

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

//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
