const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load account controller
const icon = require ('../../controllers/icon.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });
// @route   GET api/icons/test
// @desc    Test icon router
// @access  Public
router.get('/test', icon.icon_test);

// @route   POST api/icons
// @desc    Add New Icon
// @access  Private
router.post('/', passportJWT, icon.add_icon);


// @route   GET api/icons
// @desc    Get Icons
// @access  Public
router.get('/', icon.get_icons);

module.exports = router;