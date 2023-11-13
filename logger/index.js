import express from 'express'
const app = express()
import fs from 'fs'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
  console.log(req)
  let d = new Date()
  let logger =  req.url +'\n'+ req.method +'\n'+ d.toLocaleDateString() + '\n' +req.ip + '\n'
  fs.appendFile('./logger.txt', logger,(err) => {
    if (!err) {
      console.log('Done...')
    }
  })
  res.send({result: req.url})
})


app.listen(3000, () => {
  console.log('Server is running...')
})