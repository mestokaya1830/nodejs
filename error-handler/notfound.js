const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.status(200).send('Home Page')
})

//page not found error
app.use((req, res)=>{
  res.status(404).send('Page Not Found')
})


//with json objects
// app.use((req, res) => {
//   res.status(404).json({
//     success: 'false',
//     message: 'Page not found',
//     error: {
//       statusCode: 404,
//       message: 'You reached a route that is not defined on this server',
//     }
//   })
// })

app.listen(3000, ()=> {
  console.log('Server is runing...')
})