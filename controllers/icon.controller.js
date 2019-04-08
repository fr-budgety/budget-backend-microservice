const Icon = require('../models/Icon');
const newIcons = require('../util/icons');

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
       Icon.remove();
       let loadingIcons = new Promise ((resolve, rejection)=>{ 
           newIcons.map (icon => {
               iconFields.name = icon.name;
               iconFields.type = icon.type;
               iconFields.icon = icon.icon;
               new Icon(iconFields).save();
           })
       });
       loadingIcons.then(res.json({success: 'Icon filled'}))
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

