const fs = require('fs')
const path = './index.html'

if(fs.existsSync(path)){
  fs.readFile(path, 'utf8', (err, data) => {
    if (!err) {
      console.log(data)
    }
  })
}