const fs = require('fs')
const path = '../../soccer.json'

if(fs.existsSync(path)){
  fs.readFile(path, (err, data) => {
    if (!err) {
      console.log(JSON.parse(data))
    }
  })
}