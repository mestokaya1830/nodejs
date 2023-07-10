const fs = require('fs')
const dir = './newfolder'
try {
    fs.rmdirSync(dir, { recursive: true });
    console.log(`${dir} is deleted!`);
} catch (err) {
    console.error(`Error while deleting ${dir}.`);
}