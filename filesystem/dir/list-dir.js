const fs = require('fs')
const target = '/home/mesto/'
// const target = path.join('./')//get files of current directory
fs.readdir(target, (err, dirs) => {
  if(!err){
    dirs.forEach(item => {
      console.log(item)
    })
  } else {
    console.error(err);
  }
})