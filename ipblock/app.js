const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

var blackList =
[
    '77.88.99.1',
    '88.77.99.1',
    // '::1'//localhost
    
];

app.get('/', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress 
    if(blackList.includes(ip)){
      res.send(blackList)
        res.end()
    }
    res.send('Hello')
})

app.listen(3000, () => {
  console.log('Server is runnning...')
})