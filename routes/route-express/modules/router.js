import express from 'express';
const router = express.Router();
import path from 'path'

router.get('/', function (req, res) {
  res.status(200).sendFile(path.resolve('views', 'index.html'))
})
router.get('/home', function (req, res) {
  res.status(200).sendFile(path.resolve('views', 'home.html'))
})

export default  router