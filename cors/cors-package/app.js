const express = require('express')
const app = express()
const cors  = require('cors')

const cors = require('cors');
app.use(cors()); // permission all domains

app.use(cors({
  origin: 'https://benimsitem.com' // only this domain
}));

app.use(cors({
  origin: ['https://benimsitem.com', 'https://app.benimsitem.com'] //this two domains
}));

app.use(cors({
  origin: 'https://benimsitem.com',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'] //methods
}));

//frontend
fetch('https://api.benimsitem.com/data', {
  method: 'GET',
  credentials: 'include', // cookie göndermek için
  headers: {
    'Authorization': 'Bearer TOKEN123'
  }
})

app.get('/', (req, res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.hostname)
  console.log(req.headers)
  console.log(Object.entries(res.header))
  res.json({message: 'Cors without package'})
})

app.listen(3000, () => {
  console.log('Server is running...')
})