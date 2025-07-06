import fs from 'fs'
import csv from 'csvtojson'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'
import db from './db.js'
import Users from './usersSC.js'
//save to monogodb
(async () => {
  const readStream = fs.createReadStream('./import.csv')
  const saveMongo = async (param) => {
    const newUser = new Users(param)
    await newUser.save()
  }
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
            customerid: chunk['Customer Id'],
            firstname: chunk['First Name'],
            lastname: chunk['Last Name'],
            company: chunk['Company']
          }
          callback(null, user)
        }
      }),
      new Transform({ //filter csv
        objectMode: true,
        transform(user, enc, callback){
          if(user.company == 'Rocha-Hart'){
            callback(null, user)
            return
          }
          callback(null)
        }
      }),
      new Transform({ //save to db
        objectMode: true,
        transform(user, enc, callback){
         const value = JSON.stringify(user) + '\n'
          callback(null, value)
          console.log(user)
          saveMongo(user)
        }
      })
    )
    console.log('File created')
  } catch (error) {
    console.log(error)
  }
})()