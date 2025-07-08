const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')


router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.put('/resetpassword', AuthController.resetpassword)


module.exports = router