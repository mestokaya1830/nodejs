const fs = require('fs')
const path = './index.html'
//html file
let html = 
`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h2 id="title">Home Page</h2>
    <script>
  
    </script>
  </body>
  </html>`

fs.writeFile('./index.html', html, (err) => {
  if (!err) {
    console.log('Done...')
  }
})