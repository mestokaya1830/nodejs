const express = require('express')
const app = express()
const cors = require('cors')
const AuthRouter = require('./routers/AuthRouter')
const UsersRouter = require('./routers/UsersRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

//or include as global
app.use('/auth', AuthRouter)
app.use('/users', UsersRouter)

app.use((req, res)=>{
  res.status(404).send('Page Not Found')
})
app.listen(3000, console.log('Server is running...'))