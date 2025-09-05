// --- Создаём плавающий индикатор ---
const mqIndicator = document.createElement('div');
mqIndicator.style.position = 'fixed';
mqIndicator.style.bottom = '10px';
mqIndicator.style.right = '10px';
mqIndicator.style.padding = '5px 10px';
mqIndicator.style.background = 'rgba(0,0,0,0.7)';
mqIndicator.style.color = '#fff';
mqIndicator.style.fontSize = '12px';
mqIndicator.style.borderRadius = '4px';
mqIndicator.style.zIndex = '9999';
mqIndicator.style.pointerEvents = 'none';
mqIndicator.style.fontFamily = 'monospace';
document.body.appendChild(mqIndicator);

// --- Медиа запросы нового диапазонного синтаксиса ---
const mediaQueries = [
  '(400px <= width <= 800px)',
  '(801px <= width <= 1200px)',
  '(1201px <= width <= 1600px)',
];

// --- Функция обновления индикатора ---
function updateIndicator() {
  const width = window.innerWidth;
  const active = mediaQueries.filter((mq) => window.matchMedia(mq).matches);

  // --- Плашка на странице ---
  mqIndicator.textContent = `width: ${width}px | active: ${active.join(' , ')}`;

  // --- Консоль: очищаем и выводим ---
  console.clear(); // удаляем старые записи
  active.forEach((q) => console.log('Active media query:', q));
}

// --- Слушатель resize ---
window.addEventListener('resize', updateIndicator);
updateIndicator(); // сразу при загрузке
