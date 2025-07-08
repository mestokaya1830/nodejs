import fs from 'fs'
import csv from 'csvtojson'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

//pipeline (remove all pipe)
(async () => {
  const readStream = fs.createReadStream('./import.csv')
  const writeStream = fs.createWriteStream('./export.csv')
  
  try {
    await pipeline(
      readStream,
      csv(
        {delimiter: ','},
        {objectMode: true}//convert buffer to object
      ),
      new Transform({ //parse csv
        objectMode: true,
        transform(chunk, enc, callback){
          const user = {
            CusomerID: chunk['Customer Id'],
            FirstName: chunk['First Name'],
            LastName: chunk['Last Name'],
            Company: chunk['Company']
          }
          callback(null, user)
        }
      }),
      new Transform({ //filter csv
        objectMode: true,
        transform(user, enc, callback){
          if(user.Company == 'Rocha-Hart'){
            callback(null, user)
            return
          }
          callback(null)
        }
      }),
      new Transform({ //print to console
        objectMode: true,
        transform(user, enc, callback){
          callback(null)
          console.log(user)
        }
      }),
    )
    console.log('Finished')
  } catch (error) {
    console.log(error)
  }
})()

