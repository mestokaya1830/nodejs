const fs = require('fs')
const path = require('path')

fs.mkdir(path.resolve(__dirname, './newfolder2'), { recursive: true }, e => {
    e ? console.error(e) : console.log('Success')
 })

// const createDirectories = (pathname) => {
//    const __dirname = path.resolve();
//    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
//    fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
//        if (e) {
//            console.error(e);
//        } else {
//            console.log('Success');
//        }
//     })
// }
// createDirectories('./newfolder')