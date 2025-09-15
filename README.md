# Building-Material-Vite
src/
├─ scss/                        # стили
├─ js/
│  ├─ assets/                   # статические данные (json, конфиги, 
│																	Моковые данные)
│  ├─ animations/               # анимации и эффекты
│  │   └─ anim-block.js         # пример: IntersectionObserver-анимация
│  ├─ components/               # компоненты UI (слайдеры, modal, 
│																	кнопка "вверх")
│  │   ├─ main-slide.js         # слайдер на главной
│  │   ├─ return-to-saved-position.js # кнопка возврата к сохранённой позиции
│  ├─ dev/                      # тестовые/временные скрипты
│  ├─ layouts/                  # глобальные части страницы (header, footer, 
│																	sidebar)
│  │   ├─ header.js
│  │   ├─ footer.js
│  ├─ modules/                  # бизнес-логика (API, формочки)
│  │   ├─ auth.js               # модуль авторизации
│  │   ├─ search.js             # модуль поиска
│  ├─ utils/                    # утилитарные функции (чистые, переисполняемые)
│  │   ├─ build-swiper.js       # подготовка DOM для Swiper
│  │   ├─ debounce.js
│  │   ├─ throttle.js
│  │   ├─ formatDate.js
│  ├─ main.js                   # точка входа (импорты и запуск)
│  ├─ about.js    
│  ├─ index.js    