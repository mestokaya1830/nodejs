const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

app.use('/',  require('./api/router'))

app.use((error, req,res,next)=>{
  console.error(error)
})

app.listen(process.env.PORT || 3000,() => {
  console.log('Server is running...')
})
