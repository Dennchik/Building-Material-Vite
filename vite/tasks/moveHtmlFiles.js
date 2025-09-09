// vite/tasks/moveHtmlFiles.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function moveHtmlFiles() {
  return {
    name: 'move-html-files',
    apply: 'build',
    closeBundle() {
      const buildDir = path.resolve(__dirname, '../../build');

      function walk(dir) {
        for (const file of fs.readdirSync(dir)) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            walk(fullPath);
          } else if (file === 'index.html' && dir !== buildDir) {
            const parentDirName = path.basename(dir);
            const parentDirRelative = path.relative(buildDir, dir);

            // Если файл в подпапке — сохраняем вложенность
            const newPath = path.join(
              buildDir,
              path.dirname(parentDirRelative),
              `${parentDirName}.html`
            );

            fs.renameSync(fullPath, newPath);

            // Удаляем пустую папку
            fs.rmSync(dir, { recursive: true, force: true });
          }
        }
      }

      walk(buildDir);
    },
  };
}
