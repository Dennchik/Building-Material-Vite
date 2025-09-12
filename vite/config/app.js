// vite/config/app.js
export const app = {
  autoprefixer: {
    cascade: false,
    grid: 'auto-place',
    overrideBrowserslist: ['last 2 versions', 'ie >= 10', '> 1%', 'not dead'],
  },

  convertPugInHtml: {},

  // сюда же можно добавить конфиги для других плагинов
  postcssMediaMinMax: {},
  postcssSortMediaQueries: { sort: 'mobile-first' },
  webp: {
    inputDir: 'public/img',
    quality: 100,
  },
};
