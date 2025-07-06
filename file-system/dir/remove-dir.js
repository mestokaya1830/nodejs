const fs = require('fs')
const path = require('path')

const removeDir = (pathname) => {
    fs.rmdirSync(path.resolve(pathname), { recursive: true }, (err) => {
        if(!err) if(!err)console.log(`${dir} is removed!`);
    })
}
removeDir('./folder1')