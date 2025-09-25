import '../scss/catalog.scss';
import { noUiSlide } from './components/noUiSlide.js';
import { collapseToggleOne } from './modules/drop-menu.js';

noUiSlide('.values-price__no-ui');

function applyCollapse() {
  const filterCollapse = document.querySelector('.categories-filter__body');
  if (filterCollapse && window.innerWidth < 768) {
    filterCollapse.classList.add('_collapse');
    collapseToggleOne();
  } else if (filterCollapse) {
    filterCollapse.classList.remove('_collapse');
  }
}

//* ✅ Срабатывает при загрузке страницы
window.addEventListener('DOMContentLoaded', applyCollapse);

// Срабатывает при изменении размера окна
window.addEventListener('resize', applyCollapse);
//* ✅ -------------------------------------------------------------------------
import { buildSwiper } from './utils/build-swiper.js';

buildSwiper();

import { catalogSlide } from './components/slide.js';
catalogSlide('.categories-slide');
