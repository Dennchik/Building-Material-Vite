import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getWebRoot } from '../utils/getWebRoot.js';
//* data - данные
import news from '../../src/data/news.json' with { type: 'json' };
import about from '../../src/data/about.json' with { type: 'json' };
import partners from '../../src/data/partners.json' with { type: 'json' };
import products from '../../src/data/products.json' with { type: 'json' };
import data from '../../src/data/data.json' with { type: 'json' };
import catalogMenu from '../../src/data/dropDownMenu.json' with { type: 'json' };
import productsMap from '../../src/data/productsMap.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getPugConfig(isProd) {
  return {
    minify: true,
    extension: '.pug',

    locals: {
      linkTo: (slug, filename = '') => {
        const clean = slug.replace(/^\.?\//, '').replace(/\.html$/i, '');
        const slugParts = clean.split('/');
        const fileParts = filename
          .replace(/^\.?\//, '')
          .replace(/\.pug$/i, '')
          .split('/');

        const isSamePage =
          slugParts.join('/') === fileParts.join('/') ||
          slugParts.at(-1) === fileParts.at(-1); // fallback match

        if (isSamePage) {
          return isProd ? `./${slugParts.at(-1)}.html` : `./index.html`;
        }

        return isProd ? `./${clean}.html` : `/${clean}/`;
      },

      getWebRoot: (filename) => getWebRoot(filename, isProd),
      productsMap,
      news,
      about,
      partners,
      products,
      catalogMenu,
      ...data,
    },

    pugOptions: {
      pretty: !isProd,
      basedir: path.resolve(__dirname, '../../'), // корень проекта
    },
  };
}
