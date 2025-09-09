import { defineConfig } from 'vite'; // 👈
// import { resolve } from 'path'; // 👈
//* Path
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
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

// 🔹 Сначала конвертируем шрифты перед dev/build
fonts('./public/fonts');

export default defineConfig(({ command }) => {
  const isProd = command === 'build';

  return {
    plugins: [
      fonts(),
      // Запускаем compileScss() только при build
      ...(isProd ? [compileScss()] : []),
      fontStyle(),
      convertImagesToWebp({
        inputDir: 'public/img', // папка с картинками
        quality: 80,
      }),
      // pugPlugin(),
      viteConvertPugInHtml({
        minify: true,
        // Расширение файлов
        extension: '.pug',

        locals: {
          productsMap,
          // 👈  Добавляем поддержку @@ синтаксиса
          // '@@webRoot': isProd ? './' : '/',
          // webRoot: isProd ? '../' : './',
          news,
          about,
          partners,
          products,
          ...data,
        },
        pugOptions: {
          pretty: !isProd, // 👈 форматирование только в development
          // 👈  Дополнительные опции Pug если нужно
        },
      }),
      // moveHtmlFiles(), // ← ключевой плагин для переименования HTML
    ],
    base: './',
    server: {
      open: true,
    },

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
      sourcemap: !isProd, // 👈  карты отключены в Production
      rollupOptions: {
        // input: {},
        input: {
          // main: resolve(__dirname, 'pages/index.html'),
          // about: resolve(__dirname, 'pages/about/index.html'),
          // contacts: resolve(__dirname, 'page/contacts.html'),
        },
      },
    },
  };
});
