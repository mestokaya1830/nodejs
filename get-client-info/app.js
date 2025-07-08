import express from 'express'
const app = express()
import satelize from 'satelize'

app.get('/', (req, res, next) => {
  var user = {
    ip: req.header('x-forwarded-for') || req.socket.remoteAddress, // Get IP - allow for proxy
    referrer: req.header('referrer'), //  Likewise for referrer
    agent: req.header('user-agent'), // User Agent we get from headers
    // screen: { // Get screen info that we passed in url post data
    //   width: req.body('width'),
    //   height: req.body('height')
    // }
  }
  satelize.satelize({ip: '176.3.140.38'}, (err, data) => {
    console.log(data)
  })
  res.json({user})
})
app.listen(4000, () => {
  console.log('Server is running...')
})