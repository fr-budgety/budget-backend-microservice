const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load expense controller
const expense = require ('../../controllers/expense.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET api/expenses/test
// @desc    Test expenses router
// @access  Public
router.get('/test', expense.expense_test);

// @route   POST api/expenses
// @desc    Add New Expense
// @access  Private
router.post('/', passportJWT, expense.add_expense);


module.exports = router;