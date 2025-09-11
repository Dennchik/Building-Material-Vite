//! vite.config.js
import { defineConfig } from 'vite'; //👈
//* Path
import { dirname, resolve } from 'node:path'; //👈
import { fileURLToPath } from 'node:url'; //👈
import { paths } from './path.js';
//* Plugins
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import postcssMediaMinMax from 'postcss-media-minmax'; //👈
import autoprefixer from 'autoprefixer'; //👈
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html'; //👈
//* Tasks
import { moveHtmlFiles } from '../tasks/moveHtmlFiles.js'; //👈
import { fontStyle } from '../tasks/fontsStyle.js'; //👈
import { convertImagesToWebp } from '../tasks/webp.js'; //👈
import { compileScss } from '../tasks/scss.js'; //👈
import { fonts } from '../tasks/fonts.js'; //👈
//* app
import { app } from './app.js';
import { getPugConfig } from './pug-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url)); //👈

// 🔹 Сначала конвертируем шрифты перед dev/build
// fonts('./public/fonts');
fonts(paths.fonts.src);

export default defineConfig(({ command }) => {
  const isProd = command === 'build';

  return {
    base: './',
    plugins: [
      fonts(),
      ...(isProd ? [compileScss()] : []), // 👈 Запускаем compileScss() только при build
      fontStyle(),
      convertImagesToWebp(app.webp),
      viteConvertPugInHtml(getPugConfig(isProd)),
      moveHtmlFiles(), // 👈 ключевой плагин для переименования HTML
    ],
    server: {
      open: true,
    },
    css: {
      devSourcemap: true,
      postcss: {
        plugins: [
          autoprefixer(app.autoprefixer),
          postcssSortMediaQueries(app.postcssSortMediaQueries),
          //*конвертация нового синтаксиса медиа-запросов
          ...(isProd ? [] : [postcssMediaMinMax(app.postcssMediaMinMax)]), //👈
        ],
      },
      preprocessorOptions: { scss: {} },
    },
    resolve: {
      alias: { '@': resolve(__dirname, 'src') },
    },

    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: !isProd,
    },
  };
});
