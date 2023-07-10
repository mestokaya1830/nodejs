const express = require('express')
const app = express()


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
  res.json({user})
})
app.listen(3000, () => {
  console.log('Server is running...')
})