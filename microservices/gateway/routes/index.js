const Router = require('express').Router()
const axios = require('axios')
const apiList = require('./servers.json')
const fs = require('fs')

//with json file
// Router.all('/:apiname/:path', (req, res) => {
//     if(apiList.services[req.params.apiname]){
//       axios.get(apiList.services[req.params.apiname].url + req.params.path).then(result => {
//         res.status(200).json({data:result.data})
//       })
//     } else {
//       res.status(401).json({data:'Api not found!'})
//     }
// })

//short way
Router.all('/:apiname', (req, res) => {
    axios.get('http://localhost:3001/' + req.params.apiname).then(result => {
      res.status(200).json({data:result.data})
    })
})

//with post
// Router.all('/:apiname', (req, res) => {
//     axios({
//       method: req.method,
//       url: 'http://localhost:3001/' + req.params.apiname,
//       headers: req.headers,
//       data: req.body
//     }).then(result => {
//       res.status(200).json({data:result.data})
//     })
// })

//run this route on terminal with curl or inside gateway app.listen
//with axios post method or with postman
// Router.post('/register', (req, res) => {
//   const data = {
//     apiname: "api2",
//     host: "htpp://localhost",
//     port: "3002",
//     url: "http://localhost:3002/"
//   }
//   apiList.services[data.apiname] = data

//   fs.writeFile('./routes/servers.json', JSON.stringify(apiList), (error => {
//     if(error){
//       res.status(401).json({error: error})
//     } else {
//       res.status(200).json({message:'Success'})
//     }
//   }))
// })
module.exports = Router