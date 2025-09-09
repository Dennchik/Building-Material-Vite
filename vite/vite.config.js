//* Path
import { defineConfig } from 'vite'; // 👈
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
//* Plugins
import postcssMediaMinMax from 'postcss-media-minmax'; // 👈
import autoprefixer from 'autoprefixer'; // 👈
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
//* Tasks
// import { moveHtmlFiles } from './vite/tasks/moveHtmlFiles.js';
import { fontStyle } from './vite/tasks/fontsStyle'; // 👈
import { convertImagesToWebp } from './vite/tasks/webp.js'; // 👈
import { compileScss } from './vite/tasks/scss.js'; // 👈
import { fonts } from './vite/tasks/fonts.js'; // 👈
//* data - данные
import news from './src/data/news.json' with { type: 'json' };
import about from './src/data/about.json' with { type: 'json' };
import partners from './src/data/partners.json' with { type: 'json' };
import products from './src/data/products.json' with { type: 'json' };
import data from './src/data/data.json' with { type: 'json' };
import productsMap from './src/data/productsMap.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Конвертируем шрифты перед dev/build
fonts('./public/fonts');

export default defineConfig(({ command }) => {
  const isProd = command === 'build';

  return {
    plugins: [
      fonts(),
      ...(isProd ? [compileScss()] : []),
      fontStyle(),
      convertImagesToWebp({ inputDir: 'public/img', quality: 80 }),
      viteConvertPugInHtml({
        minify: true,
        extension: '.pug',
        flatOutput: true,
        // На случай, если плагин всё же применит rename — пусть будет корректный формат
        rename: (name) => `${name}.html`,
        locals: {
          // webRoot: '../',

          // 👈  Добавляем поддержку @@ синтаксиса
          '@@webRoot': isProd ? './' : '/',
          // 👈  Альтернативно можно использовать webRoot для совместимости
          webRoot: isProd ? './' : '/',
          productsMap,
          news,
          about,
          partners,
          products,
          ...data,
        },
        pugOptions: {
          pretty: !isProd,
        },
      }),
      // moveHtmlFiles(), // ← ключевой плагин для переименования HTML
    ],

    base: './',
    server: { open: true },

    css: {
      devSourcemap: true,
      postcss: {
        plugins: [
          autoprefixer({
            cascade: false,
            overrideBrowserslist: [
              'last 2 versions',
              'ie >= 10',
              '> 1%',
              'not dead',
            ],
          }),
          ...(isProd ? [] : [postcssMediaMinMax()]), // 👈 конвертация нового синтаксиса медиа-запросов
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
      rollupOptions: {
        input: {}, // Пусть Pug-плагин сам найдёт страницы
      },
    },
  };
});
