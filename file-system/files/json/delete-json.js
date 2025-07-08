const fs = require('fs')
fs.unlink('./users.json',(err)=>{
  if (!err) {
    console.log('Done...')
  }
})