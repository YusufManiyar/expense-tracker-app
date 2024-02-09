const express = require('express')
const usersController = require('../controller/users.js') 
const router = express.Router()

router.post('/login', usersController.login)

module.exports = router
