import fs from 'fs'
import path from 'path';
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
async function getDir(pathname) {
  try {
    const files = await fs.promises.readdir(path.resolve(__dirname, pathname));
    if (files.length === 0) {
      console.log('Dizin boş.');
      return;
    }
    files.forEach(item => {
      console.log(item);
    });
  } catch (err) {
    console.error('Dizin okunurken hata oluştu:', err.message);
  }
}

// getDir('/home/mesto/');
getDir('./');