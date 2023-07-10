const fs = require('fs')
let users = [
  {id:1,name:"Mesto"},
  {id:2,name:"Ali"},
  {id:3,name:"Hasan"}
]
fs.appendFile('./users.json', JSON.stringify(users),(err) => {
  if (!err) {
    console.log('Done...')
  }
})

//or
// fs.writeFile('./users.json', JSON.stringify(users),(err) => {
//   if (!err) {
//     console.log('Done...')
//   }
// })

//write inside services object
 const apiList = require('./apiList.json')
  const data = {
    apiname: "api2",
    host: "htpp://localhost",
    port: "3002",
    url: "http://localhost:3002/"
  }
  apiList.services[data.apiname] = data

  fs.writeFile('./routes/servers.json', JSON.stringify(apiList), (error => {
    if(error){
      res.status(401).json({error: error})
    } else {
      res.status(200).json({message:'Success'})
    }
  }))
