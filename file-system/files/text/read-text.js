const fs = require('fs')
const path = './edit.txt'
if(fs.existsSync(path)){
  fs.readFile(path, 'utf8', (err, data) => {
    if (!err) {
      let tt = data.split('\n')
      let test = []
      tt.forEach((item, index) => {
        let ty = (item[0] = (index + item.substring(1, item.length)))
        test.push(ty)
      });
      console.log(test)
      fs.writeFile('./newtx.txt', test.split(',').toString(), (err) => {
        if(!err){
          console.log('Done')
        }
      })
    }
  })
}