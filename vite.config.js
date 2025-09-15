//! vite.config.js
import { defineConfig } from 'vite';

//* Path
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { paths } from './vite/config/path.js';
//* Plugins
import { visualizer } from 'rollup-plugin-visualizer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import postcssMediaMinMax from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
//* Tasks
import { moveHtmlFiles } from './vite/tasks/moveHtmlFiles.js';
import { fontStyle } from './vite/tasks/fontsStyle.js';
import { convertImagesToWebp } from './vite/tasks/webp.js';
import { compileScss } from './vite/tasks/compileScss.js';
import { fonts } from './vite/tasks/fonts.js';
//* app
import { app } from './vite/config/app.js';
import { getPugConfig } from './vite/config/pug-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 🔹 конвертируем шрифты перед dev/build
fonts(paths.fonts.src);

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
              filename: './build/chunk-report.html',
              template: 'treemap', // вид отчёта: 'sunburst', 'tree map', 'network'
              gzipSize: true,
              brotliSize: true,
              open: true,
            }),
          ]
        : []),
    ],
    server: {
      open: true,
    },
    css: {
      devSourcemap: !isProd, // только для dev
      postcss: {
        plugins: [
          autoprefixer(app.autoprefixer),
          postcssSortMediaQueries(app.postcssSortMediaQueries),
          //*конвертация нового синтаксиса медиа-запросов
          ...(isProd ? [] : [postcssMediaMinMax(app.postcssMediaMinMax)]),
        ],
      },
      preprocessorOptions: { scss: {} },
    },
    resolve: {
      alias: { '@': resolve(__dirname, 'src') },
    },
    // root: 'pages', // 👈 теперь Vite ищет index.html в pages/
    build: {
      outDir: 'build',
      emptyOutDir: true,
      // sourcemap: !isProd,
      sourcemap: false,
      cssCodeSplit: true, // 👈 теперь стили делятся по Chunks

      chunkSizeWarningLimit: 500,
      minify: 'esbuild',
      commonjsOptions: {
        transformMixedEsModules: true,
      },

      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/js/index.js'),
          about: resolve(__dirname, 'src/js/about.js'),
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          chunkFileNames: 'assets/vendors/[name]-[hash].js',

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
      optimizeDeps: {
        include: ['lodash', 'axios'],
        exclude: [],
      },
    },
  };
});
