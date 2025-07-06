const fs = require('fs')
fs.unlink('./index.html',(err)=>{
  if (!err) {
    console.log('Done...')
  }
})