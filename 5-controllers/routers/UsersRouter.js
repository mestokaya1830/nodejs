const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/UsersController')


router.get('/', UsersController.index)
router.get('/:id', UsersController.find)
router.post('/create', UsersController.create)
router.put('/update', UsersController.update)
router.delete('/delete', UsersController.delete)


module.exports = router