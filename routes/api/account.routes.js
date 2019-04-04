const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load account controller
const account = require ('../../controllers/account.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET api/accounts/test
// @desc    Test accounts router
// @access  Public
router.get('/test', account.account_test);

// @route   POST api/accounts/add/account
// @desc    Add New Account
// @access  Private
router.post('/add/account', passportJWT, account.add_account);

// @route   POST api/accounts/edit/:id
// @desc    Add New Account
// @access  Private
router.post('/edit/account/:id', passportJWT, account.edit_account);

// @route   GET api/accounts
// @desc    Retrieve all accounts
// @access  Private
router.get('/', passportJWT, account.all_accounts);

// @route   DELETE api/accounts/:id
// @desc    Delete an account by id
// @access  Private
router.delete('/:id', passportJWT, account.delete_account);

// @route   GET api/accounts/:id
// @desc    Get an account by id
// @access  Private
router.get('/:id', passportJWT, account.single_account);


module.exports = router;