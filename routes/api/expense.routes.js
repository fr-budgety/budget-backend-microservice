const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load account controller
const expense = require ('../../controllers/expense.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET api/expense/test
// @desc    Test expense router
// @access  Public
router.get('/test', expense.expense_test);

// @route   POST api/expenses
// @desc    Add New Expense
// @access  Private
router.post('/', passportJWT, expense.add_expense);

// @route   GET api/expenses
// @desc    Get all expenses by user id
// @access  Private
router.get('/', passportJWT, expense.get_expenses);

// @route   DELETE api/expenses/:id
// @desc    Delete a category by id
// @access  Private
router.delete('/:id', passportJWT, expense.delete_expense);

module.exports = router;