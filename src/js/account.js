import '../scss/accuont.scss';
import { placeOrder } from './layouts/layouts.js';
placeOrder();
import { select } from './components/itsSelect.js';
select();
//* ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const tabMenuItems = document.querySelectorAll('.user-bar__item');
  const tabContents = document.querySelectorAll('.personal-account__tab');

  // Функция для активации вкладки по индексу
  function activateTabByIndex(index) {
    // Проверяем, что индекс валиден
    if (index < 0 || index >= tabContents.length) {
      console.error('Неверный индекс вкладки:', index);
      return;
    }

    // Скрываем все вкладки
    tabContents.forEach((tab) => {
      tab.style.display = 'none';
    });

    // Деактивируем все пункты меню
    tabMenuItems.forEach((item) => {
      item.classList.remove('_active');
    });

    // Показываем нужную вкладку
    tabContents[index].style.display = 'block';

    // Активируем соответствующий пункт меню
    tabMenuItems[index].classList.add('_active');
  }

  // Добавляем обработчики событий для каждого пункта меню
  tabMenuItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      activateTabByIndex(index); // Передаем индекс текущего элемента

      const menuPageSide = document.querySelector('.toggle-menu');
      const sidebarMenu = document.querySelector('.personal-account__column');

      if (
        menuPageSide.classList.contains('_open') &&
        sidebarMenu.classList.contains('_opened-menu')
      ) {
        menuPageSide.classList.remove('_open');
        sidebarMenu.classList.remove('_opened-menu');
      }
    });
  });

  // Инициализация: показываем активную вкладку при первой загрузке
  // Находим активный по умолчанию пункт меню
  const initialActiveMenuItem = document.querySelector(
    '.user-bar__item._active'
  );
  let initialIndex = 0; // По умолчанию активируем первый элемент

  if (initialActiveMenuItem) {
    // Если есть активный элемент, находим его индекс
    initialIndex = Array.from(tabMenuItems).indexOf(initialActiveMenuItem);
  }

  activateTabByIndex(initialIndex);
});

const toggleWrap = document.querySelector('.toggle-wrap');
const sidebarMenu = document.querySelector('.personal-account__column');
toggleWrap.addEventListener('click', addClassOpen);
const menuPageSide = document.querySelector('.toggle-menu');
function addClassOpen() {
  menuPageSide.classList.toggle('_open');
  sidebarMenu.classList.toggle('_opened-menu');
}
