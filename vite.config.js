import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer'; // 👈 вот этот импорт добавь
import { fonts } from './vite/tasks/fonts.js';
import { fontStyle } from './vite/tasks/fontsStyle';
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
import { compileScss } from './vite/tasks/scss.js';
import { convertImagesToWebp } from './vite/tasks/webp.js';

//* data - данные
import categories from './src/data/slide-product.json' with { type: 'json' };
import data from './src/data/data.json' with { type: 'json' };

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
          // Добавляем поддержку @@ синтаксиса
          '@@webRoot': isProd ? './' : '/',
          // Альтернативно можно использовать webRoot для совместимости
          webRoot: isProd ? './' : '/',
          categories,
          ...data,
        },
        pugOptions: {
          pretty: !isProd, // форматирование только в development
          // Дополнительные опции Pug если нужно
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
      sourcemap: !isProd, // карты отключены в Production
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
