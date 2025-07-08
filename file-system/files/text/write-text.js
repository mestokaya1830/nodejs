const fs = require('fs')
fs.writeFile('./test.txt', 'Hello dear!', (err) => {
  if(!err){
    console.log('Done')
  }
})

//or
// fs.appendFile('./test.txt', 'Hello dear!', (err) => {
//   if(!err){
//     console.log('Done')
//   }
// })