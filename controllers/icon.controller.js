const Icon = require('../models/Icon');
const newIcons = require('../util/icons');
const IconFetcher = require('../util/IconsFetcher');
const EXPENSE_ICONS_PATH = './assets/icons/expense';
const INCOME_ICONS_PATH = './assets/icons/income';

// @route   GET api/icons/test
// @desc    Test user router
// @access  Public
exports.icon_test = (req, res) => res.json({
  msg: 'Icons works'
});

// @route   GET api/icons
// @desc    Get Icons
// @access  Public
exports.get_icons =  (req, res) => {
  const errors={
    name: ''
  }
  Icon.find()
  .then(icons => {
      if (icons.length === 0) {
          errors.name = 'You have no custom icons'
          return res.status(400).json(errors)
      }
      return res.json(icons)
  }).catch(err=>console.log(err))
}

// @route   POST api/icons
// @desc    Add Icons
// @access  Private
exports.add_icon = (req, res) => {
       //Fill with fields
       const iconFields = {};
       const expenseIcons = new IconFetcher (EXPENSE_ICONS_PATH);
       const incomeIcons = new IconFetcher (EXPENSE_ICONS_PATH);
       Icon.remove();
       let expenseIconsPromise = new Promise ((resolve, rejection)=>{ 
           expenseIcons.map (icon => {
               let counter = 0;
               const iconFields = {
                   name: `custom expense ${counter}`,
                   type: 'expense',
                   icon
               }
               new Icon(iconFields).save();
           })
       });
       expenseIconsPromise.then(res.json({success: 'Expense Icon filled'}))
       .catch(res.json({err: 'Error filling icon collection'}));
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

