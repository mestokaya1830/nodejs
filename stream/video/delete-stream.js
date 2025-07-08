const fs = require('fs')
fs.unlink('./video.mp4',(err)=>{
  if (!err) {
    console.log('Done...')
  }
})