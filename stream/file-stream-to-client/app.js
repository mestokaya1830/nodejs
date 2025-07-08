import express from 'express'
const app = express()
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'

app.use(express.static('static'))
app.use(express.json())
app.use(helmet())


app.get('/', async(req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/users', async(req, res) => {
  const path = './users.json'
  //with readfile
  // if(fs.existsSync(path)){
  //   fs.readFile(path, (err, data) => {
  //     if(!err){
  //       console.log(JSON.parse(data))
  //       res.json({users: JSON.parse(data)})
  //     }
  //   })
  // }

  //with stream
  let stream = fs.createReadStream(path)
  stream.pipe(res);
})



app.use((err, req, res, next) => {
  console.log('err')
  next(err)
})


app.listen(3000, () => {
  console.log('Server is runninng on the 3000 port...')
})