import { execSync } from 'child_process';
import { resolve, basename } from 'path';
import fs from 'fs';
import glob from 'glob';

export function compileScss() {
  const inputDir = resolve('src/scss');
  const outputDir = resolve('public/css');

  fs.mkdirSync(outputDir, { recursive: true });

  const scssFiles = glob.sync(`${inputDir}/*.scss`);

  scssFiles.forEach((file) => {
    const fileName = basename(file, '.scss');
    const outputFile = `${outputDir}/${fileName}.css`;

    try {
      execSync(`sass "${file}":"${outputFile}"`, { stdio: 'inherit' });
      console.log(`✅ Скомпилирован: ${fileName}.scss → ${fileName}.css`);
    } catch (error) {
      console.error(`❌ Ошибка компиляции ${fileName}.scss:`, error);
    }
  });
}
