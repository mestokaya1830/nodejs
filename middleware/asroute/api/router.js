const express = require('express')
const router = express.Router()
const path = require('path')
const auth = require('./auth')

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../login.html'))
})
router.get('/account', auth, function (req, res, next) {
  res.sendFile(path.join(__dirname, '../account.html'))
})

module.exports = router