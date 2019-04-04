const Category = require('../../models/Category');
const validateCategoryCreationInput = require('../../validation/categories/category-creation');


// @route   GET api/categories/test
// @desc    Test user router
// @access  Public
exports.category_test = (req, res) => res.json({
    msg: 'Category works'
});

// @route   GET api/categories
// @desc    Get categories by user Id
// @access  Private
exports.get_categories =  (req, res) => {
    const errors = {};
    Category.find({
            user: req.user.id
        }).populate('expenses')
        .then(category => {
            if (category.length === 0) {
                errors.name = 'You have no category'
                return res.status(400).json(errors)
            }
            return res.json(category)
        })
}

// @route   POST api/categories
// @desc    Add New Category or Edit if :id is supplied
// @access  Private
exports.add_category = (req, res) => {
    const {
        errors,
        isValid
    } = validateCategoryCreationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Fill with fields
    const categoryFields = {};
    categoryFields.user = req.user.id;
    if (req.body.name) categoryFields.name = req.body.name;
    if (req.body.type) categoryFields.type = req.body.type;
    if (req.body.icon) categoryFields.icon = req.body.icon
    //Check if account already exists or create a new one
    Category.findOne({ name: categoryFields.name })
        .then(category => {
            if (category && !req.body.id) {
                errors.name = 'The category name already exists'
                return res.status(400).json(errors)
            } else {
                Category.findOne({
                    _id: req.body.id
                })
                .then(itemUpdate => {
                    if(itemUpdate){
                        console.log('updating element');
                        Category.findOneAndUpdate({ _id: req.body.id }, {$set: categoryFields}, {new: false})
                        .then(category=> res.json(category))
                        .catch(err => console.log('Unable to update the category: ', err)) 
                    } else {
                        console.log('creating category');

                        new Category(categoryFields).save().then(category => res.json(category));
                    }
                })
            }
        })
}

// @route   DELETE api/categories/:id
// @desc    Delete a category by id
// @access  Private
exports.delete_category = (req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            //Check for category owner
            if (category.user.toString() !== req.user.id) {
                return res.status(401).json({
                    notauthorized: 'User not authorized'
                })
            }

            //Delete
            category.remove().then(() => res.json({
                success: true
            }));
        })
}


// @route   GET api/category/:id
// @desc    Get a category by id
// @access  Private
exports.get_category = (req, res) => {
    const errors = {};
    Category.findOne({
            _id: req.params.id
        })
        .then(category => {
            if (!category) {
                errors.noaccount = `Invalid Category`;
                res.status(404).json(errors);
            }
            res.json(category);
        })
        .catch(err => res.status(404).json(err));
};

