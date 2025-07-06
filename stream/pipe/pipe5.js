import fs from 'fs'
import csv from 'csvtojson'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'
import {createGzip} from 'zlib'

//save to file as zip
(async () => {
  const readStream = fs.createReadStream('./import.csv')

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
      new Transform({ //save to file
        objectMode: true,
        transform(user, enc, callback){
         const value = JSON.stringify(user) + '\n'
          callback(null, value)
          console.log(user)
        }
      }),
      createGzip(),
      fs.createWriteStream('./export.json.gz')
    )
    console.log('File created')
  } catch (error) {
    console.log(error)
  }
})()