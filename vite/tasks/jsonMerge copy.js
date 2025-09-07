// vite/tasks/jsonMerge.js
import fs from 'fs';
import path from 'path';

export function mergeJsonData() {
  const dataDir = path.resolve('src/data');
  const outputFile = path.join(dataDir, 'data.json');

  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.endsWith('.json') && file !== 'data.json');

  const merged = {};

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const key = path.basename(file, '.json');
    merged[key] = jsonData;
  }

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2), 'utf8');
  console.log(`✅ data.json обновлён (${files.length} файлов объединено)`);
}

// 👇 Плагин для Vite
export function jsonMergePlugin() {
  return {
    name: 'json-merge-plugin',
    buildStart() {
      mergeJsonData();
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.json') && !file.endsWith('data.json')) {
        mergeJsonData();
        // Обновляем фронтенд без перезапуска
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}
