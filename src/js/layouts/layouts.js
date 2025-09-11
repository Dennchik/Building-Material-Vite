// import IMask from 'imask';

// export function maskPhone(selector) {
//   const elements = document.querySelectorAll(selector);
//   if (!elements.length) return; // Убедитесь, что элементы существуют

//   elements.forEach((element) => {
//     let mask = null;

//     // Функция для инициализации маски
//     function initializeMask() {
//       mask = IMask(element, {
//         mask: '+7 (000) 000-00-00',
//         lazy: true, // Показывать маску только при фокусе
//       });
//       mask.updateValue(); // Сразу обновляем значение маски
//     }

//     // При фокусе на поле ввода, показываем маску
//     element.addEventListener('focus', function () {
//       if (!mask) {
//         initializeMask(); // Инициализируем маску только при первом фокусе
//       }
//       if (element.value === '') {
//         element.value = '+7 '; // Устанавливаем начальное значение
//       }
//       mask.updateValue(); // Обновляем значение маски
//     });

//     // При потере фокуса, если поле пустое, очищаем его
//     element.addEventListener('blur', function () {
//       if (element.value.trim() === '+7') {
//         element.value = ''; // Очищаем поле
//         if (mask) {
//           mask.updateValue(''); // Очищаем маску
//         }
//       }
//     });
//   });
// }

export function hideTopMenu() {
  let lastScrollTop = 0;
  const scrollMenu = document.querySelector('.page__header');

  window.addEventListener(
    'scroll',
    () => {
      const screenWidth = window.innerWidth;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // let offset = '-32px';
      let offset = 32;
      if (screenWidth <= 690) {
        // offset = '-39px';
        offset = 39;
      }
      if (screenWidth <= 490) {
        offset = 36;
      }

      if (scrollTop > lastScrollTop) {
        // scrollMenu.style.top = offset;
        scrollMenu.style.top = `-${offset}px`;
        // Прокрутка вниз — скрываем
        scrollMenu.classList.add('with-border');
      } else {
        // Прокрутка вверх — показываем
        scrollMenu.style.top = '0';
        scrollMenu.classList.remove('with-border');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // защита от отрицательных значений
    },
    { passive: true }
  );
}

export function shadowScrollHeader() {
  const handleScroll = () => {
    const headerMain = document.querySelector('.header');
    const pageContainer = document.querySelector('.page__main-content');
    const pageContainerTop = pageContainer.getBoundingClientRect().top;

    if (headerMain) {
      if (pageContainerTop < -50) {
        headerMain.classList.add('with-shadow');
      } else if (pageContainerTop <= 0) {
        headerMain.classList.remove('with-shadow');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Очистка слушателя событий при размонтировании компонента
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

//* - [ Добавить в избранное ] -
export function addFavorites(className) {
  const els = document.querySelectorAll(className);
  els.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('like');
    });
  });
}

//* - [ Управление переключением меню ] -
export function sidebarMenuHandle() {
  const burgerButtons = document.querySelectorAll('.burger-button');
  const header = document.querySelector('.header');
  const sidebarMenu = document.querySelector('.sidebar-menu');

  burgerButtons.forEach((burgerButton) => {
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle('is-active');

      if (burgerButton.classList.contains('is-active')) {
        toggleSidebarMenu(sidebarMenu);
        header.classList.add('with-shadow');
      } else if (!burgerButton.classList.contains('is-active')) {
        toggleSidebarMenu(sidebarMenu);
        header.classList.remove('with-shadow');
      }
    });
  });

  window.addEventListener('resize', () => {
    burgerButtons.forEach((burgerButton) => {
      if (burgerButton.classList.contains('is-active')) {
        document.body.classList.remove('no-scroll');
        sidebarMenu.classList.remove('_open-menu');
        burgerButton.classList.remove('is-active');
      }
    });
  });
}

export function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    //* Компенсируем исчезновение scroll bar (если нужно)
    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.remove('_open-menu');

    // resetScrollbarOffset();
    document.body.classList.remove('no-scroll');
    resetTransitionOnce(sidebarMenu);

    if (asideButton) {
      setTimeout(() => {
        asideButton.style.opacity = '1';
        asideButton.style.transition = 'opacity 0.3s ease';
        asideButton.style.pointerEvents = 'all';
      }, 300);
    }
  } else {
    if (asideButton) {
      asideButton.style.opacity = '0';
      asideButton.style.transition = 'opacity 0.3s ease';
      asideButton.style.pointerEvents = 'none';
    }

    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.add('_open-menu');

    document.body.classList.add('no-scroll');
    resetTransitionOnce(sidebarMenu);
  }

  function resetTransitionOnce(element) {
    function transitionEndHandler() {
      element.style.transition = '';
      element.removeEventListener('transitionend', transitionEndHandler);
    }

    element.addEventListener('transitionend', transitionEndHandler);
  }
}

import ItcCollapse from '../assets/its-collapse.js';
export function collapseToggle() {
  const items = document.querySelectorAll('._slideToggle');
  // console.log(items);
  items.forEach((item) => {
    // console.log(item);

    const trigger = item.querySelector('._trigger');
    // console.log(trigger);
    if (!trigger) return;
    // Создаём объект ItcCollapse один раз и сохраняем в элементе
    const collapseEl = item.querySelector('._collapse');
    if (!collapseEl) return;
    item._collapseInstance = new ItcCollapse(collapseEl);
    trigger.addEventListener('click', () => {
      // console.log(trigger);

      // Закрываем другие элементы в том же аккордеоне
      const collapse = item.closest('.parent');
      if (collapse) {
        const opened = collapse.querySelector('._open');
        if (opened && opened !== item) {
          opened.classList.remove('_open');
          opened._collapseInstance.toggle();
        }
      }
      // Переключаем текущий
      item.classList.toggle('_open');
      item._collapseInstance.toggle();
    });
  });
}
