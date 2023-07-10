const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

//native mode
// router.get('/', function (req, res) {
//   fs.readFile('./views/index.html', (err, result) => {
//     if (err) throw err;
//     res.end(result)
//   })
// })
//express mode
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
})
router.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'home.html'))
})

module.exports = router