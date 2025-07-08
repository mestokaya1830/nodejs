const express = require('express')
const serveIndex = require('serve-index')
const app = express()

console.log('Hello')

app.use('/ftp',
  express.static('public/ftp'),
  serveIndex('public/ftp', {icons: true})
)


app.listen(3000, () => {
  console.log('Server is running...')
})