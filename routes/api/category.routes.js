const express = require('express');
const passport = require('passport');
const router = express.Router();

//Load account controller
const category = require ('../../controllers/category.controller');
//Declare function for private authentication management
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET api/categories/test
// @desc    Test user router
// @access  Public
router.get('/test', category.category_test);

// @route   POST api/categories
// @desc    Add New Category or Edit if :id is supplied
// @access  Private
router.post('/', passportJWT, category.add_category);


// @route   GET api/categories
// @desc    Get categories by user Id
// @access  Private
router.get('/', passportJWT, category.get_categories);

// @route   DELETE api/categories/:id
// @desc    Delete a category by id
// @access  Private
router.delete('/:id', passportJWT, category.delete_category);

// @route   POST api/category/:id
// @desc    Edit a category
// @access  Private
router.post('/:id', passportJWT, category.edit_category);



module.exports = router;