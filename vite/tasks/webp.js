// vite/tasks/webp.js
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import sharp from 'sharp';

export function convertImagesToWebp(options = {}) {
  const {
    inputDir = 'public/img',
    quality = 80,
    extensions = ['jpg', 'jpeg', 'png'],
  } = options;

  async function processFile(file) {
    const outPath = file.replace(
      new RegExp(`\\.(${extensions.join('|')})$`, 'i'),
      '.webp'
    );
    await sharp(file).webp({ quality }).toFile(outPath);
    console.log(`✅ ${path.basename(file)} → ${path.basename(outPath)}`);
  }

  async function processAll() {
    const patterns = extensions.map((ext) => `${inputDir}/**/*.${ext}`);
    const files = patterns.flatMap((pattern) => globSync(pattern));
    if (!files.length) {
      console.log('⚠️ Нет изображений для конвертации');
      return;
    }
    for (const file of files) {
      try {
        await processFile(file);
      } catch (err) {
        console.error(`❌ Ошибка при конвертации ${file}:`, err.message);
      }
    }
  }

  return {
    name: 'convert-images-to-webp',
    async buildStart() {
      console.log('🔄 Конвертация изображений в WebP...');
      await processAll();
    },
    configureServer(server) {
      // Следим за изменениями в папке с картинками
      server.watcher.on('add', (file) => {
        if (extensions.some((ext) => file.endsWith(`.${ext}`))) {
          processFile(file).catch((err) =>
            console.error(`❌ Ошибка при конвертации ${file}:`, err.message)
          );
        }
      });
      server.watcher.on('change', (file) => {
        if (extensions.some((ext) => file.endsWith(`.${ext}`))) {
          processFile(file).catch((err) =>
            console.error(`❌ Ошибка при конвертации ${file}:`, err.message)
          );
        }
      });
    },
  };
}
