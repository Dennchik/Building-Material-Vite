import '../scss/catalog.scss';
import { noUiSlide } from './components/noUiSlide.js';
import { collapseToggleOne } from './layouts/layouts.js';
noUiSlide('.values-price__no-ui');
// document.addEventListener(
//   'DOMContentLoaded' <
//     function () {
//       const filterCollapse = document.querySelector('.categories-filter__body');
//       if (filterCollapse && document.innerWidth <= 690) {
//         filterCollapse.classList.add('_collapse');
//       }
//       window.addEventListener('resize', function () {
//         if (filterCollapse && window.innerWidth <= 690) {
//           filterCollapse.classList.add('_collapse');
//         } else {
//           filterCollapse.classList.remove('_collapse');
//         }
//       });
//     }
// );

function applyCollapse() {
  const filterCollapse = document.querySelector('.categories-filter__body');
  if (filterCollapse && window.innerWidth < 768) {
    filterCollapse.classList.add('_collapse');
    collapseToggleOne();
  } else if (filterCollapse) {
    filterCollapse.classList.remove('_collapse');
  }
}

// Срабатывает при загрузке страницы
window.addEventListener('DOMContentLoaded', applyCollapse);

// Срабатывает при изменении размера окна
window.addEventListener('resize', applyCollapse);
