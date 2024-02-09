const express = require('express')
const usersController = require('../controller/users.js') 
const router = express.Router()

router.post('/signup', usersController.signup)

module.exports = router