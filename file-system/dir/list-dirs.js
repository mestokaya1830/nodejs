const fs = require('fs')
const path = require('path')

const getDir = (pathname) => {
  fs.readdir(pathname, (err, data) => {
    if(!err){
      data.forEach(item => {
        console.log(item)
      })
    }
  })
}

getDir('/home/mesto/')