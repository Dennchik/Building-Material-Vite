//* ✅ - [ Hiding an element when scrolling ]
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
        //🔹 scrollMenu.style.top = offset;
        scrollMenu.style.top = `-${offset}px`;
        //🔹 Прокрутка вниз — скрываем
        scrollMenu.classList.add('with-border');
      } else {
        //🔹 Прокрутка вверх — показываем
        scrollMenu.style.top = '0';
        scrollMenu.classList.remove('with-border');
      }
      //🔹 защита от отрицательных значений
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    { passive: true }
  );
}

//* ✅ - [ Hiding an element when scrolling ]
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
  //🔹 Очистка слушателя событий при размонтировании компонента
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

//* ✅ - [ Добавить в избранное ] -
export function addFavorites(className) {
  const els = document.querySelectorAll(className);
  els.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('like');
    });
  });
}

//* ✅ - [ Управление переключением меню ] -
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

//* - [ Устраняем смещение Contents  ]
function resetScrollbarOffset(el) {
  document.documentElement.style.removeProperty('--scroll-position');

  if (el) {
    el.style.paddingRight = '';
    pageHeader.style.paddingRight = ``;
  }

  //🔹 Убираем компенсацию scroll bar
  document.body.style.paddingRight = '';
  window.scrollTo(0, scrollY);
}

//* ✅ - [ Выпадающий список ]
import ItcCollapse from '../assets/its-collapse.js';
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

//* ✅ - [ Drop down menu]
export function dropDownMenu(element) {
  const button = document.querySelector(element);
  const dropMenu = document.querySelector('.page__dropdown-menu');
  const pageHeader = document.querySelector('.page__header');
  const collapseEl = dropMenu.querySelector('._collapse');

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (!collapseEl) return;
  dropMenu._collapseInstance = new ItcCollapse(collapseEl);

  document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.dropdown-menu__button');

    // ✅ добавляем класс первому элементу
    if (menuLinks.length > 0) {
      menuLinks[0].classList.add('active');
    }

    for (let i = 0; i < menuLinks.length; i++) {
      const menuLink = menuLinks[i];
    }
  });

  button.addEventListener('click', () => {
    dropMenu.classList.toggle('open');
    dropMenu._collapseInstance.toggle();

    if (dropMenu.classList.contains('open')) {
      document.body.classList.add('no-scroll');
      if (scrollbarWidth > 0) {
        pageHeader.style.paddingRight = `10px`;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = `0px`;
      pageHeader.style.paddingRight = `0px`;
    }
  });
}

export function dropDownMenu(element) {
  const button = document.querySelector(element);
  const dropMenu = document.querySelector('.page__dropdown-menu');
  const collapseEl = dropMenu.querySelector('._collapse');

  if (!collapseEl) return;
  dropMenu._collapseInstance = new ItcCollapse(collapseEl);

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  const pageHeader = document.querySelector('.header');

  button.addEventListener('click', () => {
    const isOpening = !dropMenu.classList.contains('open');

    if (isOpening) {
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        pageHeader.style.paddingRight = `${scrollbarWidth}px`;
        dropMenu.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.classList.add('no-scroll');
      dropMenu.classList.add('open');
      dropMenu._collapseInstance.show();
    } else {
      document.body.classList.remove('no-scroll');
      document.body.style.paddingRight = `0px`;
      pageHeader.style.paddingRight = `0px`;
      dropMenu.style.paddingRight = `0px`;

      dropMenu.classList.remove('open');
      dropMenu._collapseInstance.hide();
    }
  });
}

//* 🔹 - [Компенсируем отступы ]
export function handleScrollbarOffset(enable) {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  console.log('scrollbarWidth:', scrollbarWidth);

  if (enable && scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.paddingRight = `0px`;
  }
}

//* ✅ - [ Показать еще ]
export function addToBlock() {
  document.addEventListener('DOMContentLoaded', function () {
    const contents = document.querySelectorAll('.content');

    contents.forEach((content) => {
      // Кнопка
      const button = content.querySelector('.form-categories__show-more');
      console.log(button);

      if (button) {
        // Текст внутри кнопки
        const buttonText = button.querySelector('span');

        // Сколько блоков видно изначально
        let visibleCount = 1;
        // Сколько блоков нужно показывать при каждом нажатии
        const blocksToShow = 1;

        // Показываем первые несколько блоков, остальные скрываем
        const showBlocks = content.querySelectorAll('.section');

        showBlocks.forEach((showBlock, index) => {
          console.log(index);
          if (index >= visibleCount) {
            // Скрываем все блоки, начиная с определенного
            showBlock.classList.add('hidden');
          }
        });

        // Функция для обновления стилей кнопки
        const updateButtonStyle = () => {
          // Проверка ширины экрана
          if (window.innerWidth >= 768) {
            if (visibleCount % 2 === 0) {
              // Добавляем класс для четного количества видимых блоков
              button.classList.add('seo-block__button--even');
            } else {
              // Удаляем класс для четного количества
              button.classList.remove('seo-block__button--even');
            }
          } else {
            // Удаляем класс, если ширина меньше 768px
            button.classList.remove('seo-block__button--even');
          }
        };

        // Проверяем стили кнопки сразу после загрузки
        updateButtonStyle();

        // Обработчик события для кнопки
        button.addEventListener('click', function () {
          if (visibleCount < showBlocks.length) {
            // Показываем следующие три блока
            for (let i = 0; i < blocksToShow; i++) {
              if (visibleCount < showBlocks.length) {
                // Показываем следующий блок
                showBlocks[visibleCount].classList.remove('hidden');
                // Увеличиваем счетчик видимых блоков
                visibleCount++;
              }
            }
            // Если все блоки показаны, меняем текст кнопки на "Свернуть"
            if (visibleCount === showBlocks.length) {
              // Меняем текст на "Свернуть"
              buttonText.textContent = 'Свернуть';
              // Добавляем класс для кнопки вращения
              button.classList.add('_rotate-button');
            }
          } else {
            // Если текст кнопки "Свернуть", возвращаем все блоки в исходное
            // состояние
            showBlocks.forEach((showBlock, index) => {
              if (index >= 1) {
                showBlock.classList.add('hidden'); // Скрываем блоки снова
              }
            });
            // Сбрасываем видимое количество блоков
            visibleCount = 1;
            // Возвращаем текст кнопки обратно на "Читать ещё"
            buttonText.textContent = 'Показать еще';
            // Удаляем класс для кнопки вращения
            button.classList.remove('_rotate-button');
          }

          // Обновляем стили кнопки после клика
          updateButtonStyle();
        });
      }
    });
  });
}
//* ----------------------------------------------------------------------------
//* ✅ - [ Sidebar - Menu ]
export function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    //🔹 Компенсируем исчезновение scroll bar (если нужно)
    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.remove('_open-menu');

    resetScrollbarOffset();
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

    handleScrollbarOffset(sidebarMenu);
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
//* - [ Управление открытием модальных окон ]
export function toggleModal() {
  const modals = [
    {
      triggerSelector: '.button-request',
      modalSelector: '.request-form',
    },
    {
      triggerSelector: '.ordercall-button',
      modalSelector: '.order-call-form',
    },
    {
      triggerSelector: '.button-question',
      modalSelector: '.questions-form',
    },
  ];

  modals.forEach(({ triggerSelector, modalSelector }) => {
    const modal = document.querySelector(modalSelector);
    const triggers = document.querySelectorAll(triggerSelector);
    const closeBtn = modal.querySelector('.btn-close');

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        handleScrollbarOffset(modal);
        document.body.classList.add('no-scroll');
        modal.classList.add('is-open');

        if (modalSelector === '.questions-form') {
          const { showFieldset } = fieldSetsToggle(); // Получаем showFieldset
          showFieldset(0); // Активируем первый fieldset
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      resetScrollbarOffset(modal);
      modal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');

      if (modalSelector === '.questions-form') {
        const active = modal.querySelector(
          '.form-question__fieldset-table.active'
        );
        if (active) {
          active.classList.remove('active');
          console.log('Класс active удалён');
        } else {
          console.log('Нет активного fieldset');
        }
      }
    });
  });
}
//* ✅ - [Переключение полей формы]
export function fieldSetsToggle() {
  const container = document.querySelector('.form-question__content');
  const fieldSets = document.querySelectorAll(
    '.form-question .form-question__fieldset-table'
  );
  let current = 0;

  const updateContainerHeight = () => {
    const active = container.querySelector(
      '.form-question__fieldset-table.active'
    );
    if (active) {
      const height = active.offsetHeight;
      container.style.height = `${height}px`;
    }
  };

  const showFieldset = (index) => {
    fieldSets.forEach((fs) => fs.classList.remove('active'));
    fieldSets[index].classList.add('active');
    updateContainerHeight();
  };

  document.querySelectorAll('._btn-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current < fieldSets.length - 1) {
        current++;
        showFieldset(current);
      }
    });
  });

  document.querySelectorAll('._btn-prev').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        showFieldset(current);
      }
    });
  });

  return {
    showFieldset, // 👈 экспортируем
  };
}
//* ✅ - [ Управление оповещением cookies ] -
export function cookiesAccept(el, trigger) {
  const cookiesAccept = document.querySelector(el);
  const button = document.querySelector(trigger);

  if (!cookiesAccept) {
    console.log('Элемент cookiesAccept не найден');
    return;
  }

  if (button) {
    button.addEventListener('click', () => {
      cookiesAccept.style.transform = 'translateY(100%)';
      cookiesAccept.style.transition = 'transform 0.5s ease';
    });
  } else {
    console.log('кнопка не найдена');
  }

  setTimeout(() => {
    cookiesAccept.style.transform = 'translateY(0)';
    cookiesAccept.style.transition = 'transform 0.5s ease';
  }, 3000);
}
