//* Plugins
import { defineConfig } from 'vite'; // 👈
import { resolve } from 'path'; // 👈
import postcssMediaMinMax from 'postcss-media-minmax'; // 👈
import autoprefixer from 'autoprefixer'; // 👈
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
//* Tasks
import { fontStyle } from './vite/tasks/fontsStyle'; // 👈
import { convertImagesToWebp } from './vite/tasks/webp.js'; // 👈
import { compileScss } from './vite/tasks/scss.js'; // 👈
import { fonts } from './vite/tasks/fonts.js'; // 👈
//* data - данные
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
      viteConvertPugInHtml({
        minify: true,
        locals: {
          productsMap,
          // 👈  Добавляем поддержку @@ синтаксиса
          '@@webRoot': isProd ? './' : '/',
          // 👈  Альтернативно можно использовать webRoot для совместимости
          webRoot: isProd ? './' : '/',
          about,
          partners,
          products,
          ...data,
        },
        pugOptions: {
          // pretty: !isProd, // 👈 форматирование только в development
          // 👈  Дополнительные опции Pug если нужно
        },
      }),
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
      preprocessorOptions: {
        scss: {},
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: !isProd, // 👈  карты отключены в Production
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          // about: resolve(__dirname, 'page/about.html'),
          // contacts: resolve(__dirname, 'page/contacts.html'),
        },
      },
    },
  };
});
