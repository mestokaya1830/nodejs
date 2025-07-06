const fs = require('fs')
const path = require('path')


const createDir = (pathname) => {
    fs.mkdir(path.resolve(pathname), { recursive: true }, (err) => {
        if(!err) console.log('Success');
    })
}
createDir('./folder1')