import { execSync } from 'child_process';
import { resolve, basename } from 'path';
import fs from 'fs';
import { globSync } from 'glob';

export function compileScss() {
  const inputDir = resolve('src/scss'); // исходные SCSS
  const outputDir = resolve('public/css'); // куда компилируем

  fs.mkdirSync(outputDir, { recursive: true });

  // Получаем список SCSS-файлов без расширения
  const scssFiles = globSync(`${inputDir}/*.scss`).map((f) =>
    basename(f, '.scss')
  );

  // Получаем список CSS-файлов в outputDir
  const existingCssFiles = fs.existsSync(outputDir)
    ? fs.readdirSync(outputDir).filter((f) => f.endsWith('.css'))
    : [];

  // Удаляем CSS, которых больше нет в исходниках
  existingCssFiles.forEach((file) => {
    const name = file.replace('.css', '');
    if (!scssFiles.includes(name)) {
      fs.unlinkSync(resolve(outputDir, file));
      console.log(`🗑️ Удалён устаревший файл: ${file}`);
    }
  });

  // Компилируем новые SCSS
  scssFiles.forEach((fileName) => {
    const inputFile = `${inputDir}/${fileName}.scss`;
    const outputFile = `${outputDir}/${fileName}.css`;

    try {
      execSync(`sass "${inputFile}":"${outputFile}"`, { stdio: 'inherit' });
      console.log(`✅ Скомпилирован: ${fileName}.scss → ${fileName}.css`);
    } catch (error) {
      console.error(`❌ Ошибка компиляции ${fileName}.scss:`, error.message);
    }
  });
}
