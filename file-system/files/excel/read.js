const reader = require('xlsx')
const file = reader.readFile('./data.xlsx')
const fs = require('fs')
let data = []
const sheets = file.SheetNames
for(let i = 0; i < sheets.length; i++){
   const temp = reader.utils.sheet_to_json(
    file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

fs.writeFile('./data.json', JSON.stringify(data),(err) => {
  if (!err) {
    console.log('Done...')
  }
})