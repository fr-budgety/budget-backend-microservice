const express = require('express');
const passport = require('passport');
const router = express.Router();

<<<<<<< HEAD
//Load account controller
=======
//Load expense controller
>>>>>>> 3ac58f97392c4202fc879eb3e73cce2fde607da0
const expense = require ('../../controllers/expense.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });

<<<<<<< HEAD
// @route   GET api/expense/test
// @desc    Test expense router
=======
// @route   GET api/expenses/test
// @desc    Test expenses router
>>>>>>> 3ac58f97392c4202fc879eb3e73cce2fde607da0
// @access  Public
router.get('/test', expense.expense_test);

// @route   POST api/expenses
// @desc    Add New Expense
// @access  Private
router.post('/', passportJWT, expense.add_expense);

<<<<<<< HEAD
// @route   GET api/expenses
// @desc    Get all expenses by user id
// @access  Private
router.get('/', passportJWT, expense.get_expenses);
=======
>>>>>>> 3ac58f97392c4202fc879eb3e73cce2fde607da0

module.exports = router;