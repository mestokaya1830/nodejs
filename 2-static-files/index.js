import express from 'express'
const app = express()
import path from 'path'
import fs from 'fs'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

//native mode
// router.get('/', function (req, res) {
//   fs.readFile('./views/index.html', (err, result) => {
//     if (err) throw err;
//     res.end(result)
//   })
// })
//express mode
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./', 'views', 'index.html'))
})
app.get('/home', function (req, res) {
  res.sendFile(path.resolve('./', 'views', 'home.html'))
})

app.use((error, req,res,next)=>{
  console.error(error)
})

app.listen(process.env.PORT || 3000,() => {
  console.log('Server is running...')
})
