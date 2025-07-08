import fs from 'fs'
import path from 'path';
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
async function removeDir(pathname) {
    try {
        await fs.promises.rm(path.resolve(__dirname, pathname), { recursive: true, force: true });
        console.log(`${pathname} deleted!`);
    } catch (err) {
        console.error('Not deleted:', err.message);
    }
}

removeDir('./folder-1');