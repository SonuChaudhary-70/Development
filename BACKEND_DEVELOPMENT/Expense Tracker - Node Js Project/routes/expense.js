const express = require('express')
const router = express.Router();
const expenseController = require('../controller/expense.js');


// add-expense routes
router.post('/add-expense',expenseController.addExpense);

// get all expense
router.get('/get-expenses',expenseController.getAllExpenses);

// get expense by id
router.get('/get-expense/:id', expenseController.getExpenseById);

// delete expense by id
router.delete('/delete-expense/:id', expenseController.deleteExpense);

// update expense by id
router.put('/update-expense/:id', expenseController.updateExpense);

module.exports = router;