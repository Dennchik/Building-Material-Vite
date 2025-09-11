//! vite.config.js
import { defineConfig, loadEnv } from 'vite'; //👈

//* Path
import { dirname, resolve } from 'node:path'; //👈
import { fileURLToPath } from 'node:url'; //👈
import { paths } from './vite/config/path.js';
//* Plugins
import { visualizer } from 'rollup-plugin-visualizer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import postcssMediaMinMax from 'postcss-media-minmax'; //👈
import autoprefixer from 'autoprefixer'; //👈
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html'; //👈

//* Tasks
import { moveHtmlFiles } from './vite/tasks/moveHtmlFiles.js'; //👈
import { fontStyle } from './vite/tasks/fontsStyle'; //👈
import { convertImagesToWebp } from './vite/tasks/webp.js'; //👈
import { compileScss } from './vite/tasks/scss.js'; //👈
import { fonts } from './vite/tasks/fonts.js'; //👈
//* app
import { app } from './vite/config/app.js';
import { getPugConfig } from './vite/config/pug-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url)); //👈

// 🔹 Сначала конвертируем шрифты перед dev/build
// fonts('./public/fonts');
fonts(paths.fonts.src);

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['swiper'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig(({ command, mode }) => {
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

      // ✅ Добавляем анализатор только в продакшн-сборке
      ...(isProd
        ? [
            visualizer({
              filename: './build/chunk-report.html', // куда сохранить отчёт
              template: 'treemap', // вид отчёта: 'sunburst', 'treemap', 'network'
              gzipSize: true, // показывать размер в gzip
              brotliSize: true, // показывать размер в brotli
              open: true, // автоматически открыть отчёт в браузере
            }),
          ]
        : []),
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

      // ✅ 1. Предупреждение, если chunks > 244 КБ
      chunkSizeWarningLimit: 500, // 👈 предупреждение при превышении лимита

      // ✅ 2. Быстрая минификация через esbuild (вместо Terser). Это ускоряет продакшн-сборку в 5–10 раз
      minify: 'esbuild',

      // ✅ 3. Оптимизация pre-bundle зависимостей. Ускоряет старт dev-сервера и HMR
      commonjsOptions: {
        transformMixedEsModules: true,
      },

      rollupOptions: {
        output: {
          // ✅ 4. Разделение зависимостей на chunk. Чтобы большие библиотеки не попадали в один файл
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.split('node_modules/')[1].split('/')[0];
          //   }
          // },

          // manualChunks: { 'swiper-bundle': ['swiper/bundle'] },

          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lodash') || id.includes('date-fns')) {
                return 'utils';
              }
              if (id.includes('chart.js') || id.includes('d3')) {
                return 'charts';
              }
              return 'vendor';
            }
          },
        },
      },
      // ✅ 5. Оптимизация зависимостей в dev-режиме
      optimizeDeps: {
        include: ['lodash', 'axios'], // сюда можно добавить часто используемые пакеты
        exclude: [], // сюда можно вынести тяжёлые, редко используемые
      },
    },
  };
});
