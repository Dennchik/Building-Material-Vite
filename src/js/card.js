import '../scss/card-products.scss';
import { buildSwiper } from './utils/build-swiper.js';
import { cardSlide } from './components/slide.js';

buildSwiper();
cardSlide();

const style = document.createElement('style');
style.textContent = `
@keyframes arrowShake {
  0% { transform: translateX(0); }
  12.5% { transform: translateX(-5px); }
  25% { transform: translateX(4px); }
  37.5% { transform: translateX(-4px); }
  50% { transform: translateX(3px); }
  62.5% { transform: translateX(-3px); }
  75% { transform: translateX(2px); }
  87.5% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
`;
document.head.appendChild(style);

// Функция для применения анимации
function initArrowAnimation() {
  const buttons = document.querySelectorAll('.card-product__button');

  buttons.forEach((button) => {
    const arrow = button.querySelector('.icon-arrow-left');

    if (arrow) {
      // Добавляем базовые стили для стрелки
      arrow.style.display = 'inline-block';
      arrow.style.transition = 'transform 0.3s ease';

      button.addEventListener('mouseenter', () => {
        arrow.style.animation = 'arrowShake 0.6s ease-in-out';
      });

      button.addEventListener('mouseleave', () => {
        // Сбрасываем анимацию после завершения
        setTimeout(() => {
          arrow.style.animation = 'none';
        }, 600);
      });
    }
  });
}

// Инициализируем при загрузке страницы
document.addEventListener('DOMContentLoaded', initArrowAnimation);

// Если элементы добавляются динамически
const observer = new MutationObserver(() => {
  initArrowAnimation();
});

observer.observe(document.body, { childList: true, subtree: true });
