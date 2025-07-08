import express  from 'express'
const app = express()
import mysql from './modules/db.js'
import helmet from 'helmet'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())

app.post('/', async(req, res) => {
  let page = req.body.page === undefined ? 1 : req.body.page
  let limit = 5

  //mysql
  mysql.query('SELECT * FROM persons WHERE ID > ? ORDER BY ID Limit ?',[page * limit, limit], (err, result) => {
  	mysql.query('SELECT COUNT(*) AS count FROM persons', (err, length) => {
  		res.json({result, length})
  	})
  })
})

app.use((err, req, res, next) => {
  console.log(err)
  next(err)
})

app.listen(3000, () => {
  console.log('Server is running...')
})
