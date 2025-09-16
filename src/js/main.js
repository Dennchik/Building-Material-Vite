import '../scss/main.scss';

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
import productsMap from '../data/productsMap.json';
export const templateData = {
  productsMap,
};

//* layouts
import {
  addFavorites,
  sidebarMenuHandle,
  hideTopMenu,
  collapseToggle,
} from './layouts/layouts.js';

document.addEventListener('DOMContentLoaded', () => {
  counterProduct();
  hideTopMenu();
  collapseToggle();
  addFavorites('.product-card__favourites');
  sidebarMenuHandle();
  dynamicAdaptive();
});

// import { smoother } from './animations/animations.jsx';
// import { validateForm } from './assets/validate-form.js';
// import { anchorsSmoothScrolling } from './assets/anchors-smooth-scrolling.js';

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
