const fs = require('fs')

const langs = ['Html','Css','Javascript','Nodejs','Mongodb']
fs.writeFile('./test.txt', langs.join('\r\n'), (err) => {
  if(!err){
    console.log('Done')
  }
})