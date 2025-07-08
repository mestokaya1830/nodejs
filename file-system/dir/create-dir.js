import fs from 'fs'
import path from 'path';
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
async function createDir(pathname) {
    try {
        await fs.promises.mkdir(path.resolve(__dirname, pathname), { recursive: true });
        console.log('Success');
    } catch (err) {
        console.error('Error:', err);
    }
}

createDir('folder-1')