const express = require('express')
const app = express()
const cors = require('cors') 
const persontRouter = require('./router/personRouter')
const limiter = require('express-rate-limit')
const User = require('./user.json')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//global middleware limit
app.use(
  limiter({
    windowMs: 1000 * 60,//1 minutes
    max: 5, // limit
    message:'You have reached api limit'
  })
)

//global middleware check api status
app.use((req, res, next) => {
  const findUser = User.find(item => item.name == 'Mesto')
  if(findUser && findUser.apikey && findUser.apikey == process.env.API_KEY){
    const api_date = new Date(findUser.date).getTime()
    if(api_date < Date.now()){
      res.status(401).json({message: 'Your APIKEY expired'})
    }
    next()
  } else {
    res.status(401).json({message:'You have not APIKEY'})
  }
})
app.use('/', persontRouter)

app.use((req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    }
  })
})


app.use((error, req, res, next) => {
  console.log(error)
  next()
})

app.listen(3000, () => {
  console.log('Server is running...')
})
