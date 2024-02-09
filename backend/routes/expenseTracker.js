const express = require('express')
const expenseController = require('../controller/expense.js') 
const router = express.Router()

router.get('/expense', expenseController.fetch)
router.post('/expense', expenseController.add)
router.put('/expense', expenseController.update)
router.delete('/expense',expenseController.delete)

module.exports = router
