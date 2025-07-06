const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

let langs = [
  {id:1,name:'Html'},
  {id:2,name:'Css'},
  {id:3,name:'Java'},
  {id:3,name:'Javascript'},
  {id:4,name:'VueJS'},
  {id:5,name:'NuxtJS'},
  {id:6,name:'NodeJS'},
  {id:7,name:'Python'},
  {id:8,name:'C'},
  {id:9,name:'C++'},
  {id:10,name:'C#'},
  {id:11,name:'Mysql'},
  {id:12,name:'Mongodb'}
]

app.get('/', (req, res) => {
  res.sendFile('index.html')
})


//paste this on url or call with fetch
//http://localhost:3000/langs?auth=mestokaya
//this part is url  =  http://localhost:3000/langs
//and this part is query = ?auth=mestokaya
app.get('/langs', (req, res) => {
  console.log(req.query.auth)
  if(req.query.auth == 'mestokaya'){
    res.status(200).send(langs)
  } else {
    res.status(403).send({message:'Your api key is not valid!'})
  }
})

app.use('*', (req, res) => {
  res.send('Page Not Found')
})

app.use((error, req, res, next) => {
  console.log(error)
  next()
})

app.listen(3000, () => {
  console.log('Server is running...')
})