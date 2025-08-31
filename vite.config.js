import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fonts } from './vite/tasks/fonts.js';
import { fontStyle } from './vite/tasks/fontsStyle';
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
import { compileScss } from './vite/tasks/scss.js';
import { convertImagesToWebp } from './vite/tasks/webp.js';

// 🔹 Сначала конвертируем шрифты перед dev/build
fonts('./public/fonts');

export default defineConfig(({ command }) => {
  const isProd = command === 'build';

  return {
    plugins: [
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
      devSourcemap: true, // карты SCSS → CSS в dev

      preprocessorOptions: {},
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
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
