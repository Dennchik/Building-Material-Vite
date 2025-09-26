import ItcCollapse from '../assets/its-collapse.js';

//* ✅ - [ Drop down menu]
export function dropDownMenu(element) {
  const dropMenu = document.querySelector('.page__dropdown-menu');
  const collapseEl = dropMenu.querySelector('._collapse');
  const menuLinks = document.querySelectorAll('.dropdown-menu__button');
  const header = document.querySelector('.page__header');
  const menuFloat = document.querySelector('.menu-float');
  const button = document.querySelector(element);

  if (!dropMenu || !collapseEl || !header || !button) return;

  // ✅  создаём collapse-instance
  dropMenu._collapseInstance = new ItcCollapse(collapseEl);

  // ✅ активируем первую ссылку
  if (menuLinks.length > 0) {
    menuLinks[0].classList.add('active');
  }

  let heightOffset = 0;
  let rectHeader = 0;
  let menuIsOpen = false;

  for (let i = 0; i < menuLinks.length; i++) {
    const menuLink = menuLinks[i];
  }

  document.addEventListener('DOMContentLoaded', () => {
    function updateHeightOffset() {
      const rectFloat = menuFloat?.getBoundingClientRect().height || 0;
      rectHeader = header.getBoundingClientRect().height;
      heightOffset = rectHeader + rectFloat;
    }

    function applyMenuHeight() {
      dropMenu.style.height = `calc(100vh + 14px - ${heightOffset}px)`;
      dropMenu.style.top = `${rectHeader}px`;
    }

    // ✅ Обновляем при при загрузке
    updateHeightOffset();

    function resizeElement() {
      function setEvent() {
        eventButton();
      }

      return setEvent;
    }

    let resizeEl = resizeElement();

    // ✅ пересчёт при resize и scroll
    ['scroll', 'resize'].forEach((evt) => {
      window.addEventListener(evt, () => {
        updateHeightOffset();
        if (menuIsOpen) applyMenuHeight();
      });
    });

    resizeEl();

    function eventButton() {
      button.addEventListener('click', () => {
        const isOpening = !dropMenu.classList.contains('open');

        // ❗ обновляем размеры перед каждым кликом
        updateHeightOffset();
        document.body.classList.toggle('no-scroll', isOpening);
        dropMenu.classList.toggle('open', isOpening);
        dropMenu._collapseInstance.toggle();

        dropMenu.style.height = isOpening
          ? `calc(100vh + 14px - ${heightOffset}px)`
          : `0px`;

        // ❗ top всегда равен высоте шапки
        dropMenu.style.top = `${rectHeader}px`;
        menuIsOpen = isOpening;

        console.log(
          'rectHeader:',
          rectHeader,
          'heightOffset:',
          heightOffset,
          'menuIsOpen:',
          menuIsOpen
        );
      });
    }
  });
}

//* ✅ - [ Выпадающий список ]
export function collapseToggle() {
  const items = document.querySelectorAll('._slideToggle');

  items.forEach((item) => {
    const trigger = item.querySelector('._trigger');

    if (!trigger) return;
    //🔹 Создаём объект ItcCollapse один раз и сохраняем в элементе
    const collapseEl = item.querySelector('._collapse');
    if (!collapseEl) return;
    item._collapseInstance = new ItcCollapse(collapseEl);

    trigger.addEventListener('click', () => {
      //🔹 Закрываем другие элементы в том же аккордеоне
      const collapse = item.closest('.parent');
      if (collapse) {
        const opened = collapse.querySelector('._open');
        if (opened && opened !== item) {
          opened.classList.remove('_open');
          opened._collapseInstance.toggle();
        }
      }
      //🔹 Переключаем текущий
      item.classList.toggle('_open');
      item._collapseInstance.toggle();
    });
  });
}

export function collapseToggleOne() {
  const items = document.querySelectorAll('._slideToggleOne');

  items.forEach((item) => {
    const trigger = item.querySelector('._trigger');

    if (!trigger) return;
    //🔹 Создаём объект ItcCollapse один раз и сохраняем в элементе
    const collapseEl = item.querySelector('._collapse');
    if (!collapseEl) return;
    item._collapseInstance = new ItcCollapse(collapseEl);

    trigger.addEventListener('click', () => {
      //🔹 Переключаем текущий
      item.classList.toggle('_open');
      item._collapseInstance.toggle();
    });
  });
}
