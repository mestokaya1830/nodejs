import fs from 'fs'
import csv from 'csvtojson'
import { Transform } from 'stream'
//pipe chaining
const readStream = fs.createReadStream('./import.csv')
const writeStream = fs.createWriteStream('./export.csv')
readStream
.pipe(
  csv(
    {delimiter: ','},
    {objectMode: true}//convert buffer to object
  )
)
.pipe(
  new Transform({
    objectMode: true,
    transform(chunk, enc, callback){ //parse csv
      const user = {
        CusomerID: chunk['Customer Id'],
        FirstName: chunk['First Name'],
        LastName: chunk['Last Name'],
        Company: chunk['Company']
      }
      callback(null, user)
    }
  })
)
.pipe(
  new Transform({
    objectMode: true,
    transform(user, enc, callback){ //filter csv
      if(user.Company == 'Rocha-Hart'){
        callback(null, user)
        return
      }
      callback(null)
    }
  })
)
.on('data', (data) => {
  // console.log(data)//buffer
  // console.log(data.toString())//convert to string 
  console.log(data)//with objectmode
})
.on('error', (err) => {
  console.log(err)
})
.on('end', () => {
  console.log('Finished')
})

