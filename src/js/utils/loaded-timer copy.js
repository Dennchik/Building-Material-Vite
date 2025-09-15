export function loadedTimer() {
  const loader = document.querySelector('.loader');
  const loaderTimer = document.querySelector('.loader__timer');
  const startTime = performance.now();

  window.addEventListener('load', () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    let currentTime = 0;
    const interval = 1; // шаг 1мс для плавности
    const timer = setInterval(() => {
      currentTime += interval;
      const seconds = Math.floor(currentTime / 1000);
      const milliseconds = currentTime % 1000;
      const formatted = `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
      loaderTimer.textContent = formatted;

      if (currentTime >= loadTime) {
        clearInterval(timer);

        // Анимация масштабирования
        setTimeout(() => {
          loaderTimer.style.transform = 'scale(2)';
          setTimeout(() => {
            loaderTimer.style.transform = 'scale(1)';
            setTimeout(() => {
              loader.remove();
            }, 500); // исчезновение
          }, 300); // scale(2)
        }, 100);
      }
    }, interval);
  });
}
