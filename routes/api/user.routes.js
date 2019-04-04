const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load user controller
const user = require ('../../controllers/user.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET api/users/test
// @desc    Test user router
// @access  Public
router.get('/test', user.user_test);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', user.user_add);

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', user.user_login);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passportJWT, user.user_current);

module.exports = router;