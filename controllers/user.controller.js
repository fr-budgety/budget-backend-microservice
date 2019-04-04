const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
//Load default icons
const defaultIcons = require('../util/categoryIcons');
//Load Input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/User');
const Category = require('../models/Category');

// @route   GET api/users/test
// @desc    Test user router
// @access  Public
exports.user_test = (req, res) => res.json({
  msg: 'User works'
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
exports.user_add = (req, res) => {
  //Validate req.body
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);
  //Check validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
      email: req.body.email
    })
    //Check if user already exists
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors)
      } else
      //If is new user fill required fields plus gravatar
      {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //Size
          r: 'pg', //Rating
          d: 'mm' //Default
        });
        const newUser = new User({
          email: req.body.email,
          avatar,
          password: req.body.password,
          terms: req.body.terms
        });
        //Hash the password and save
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                //Fill user categories with default categories
                defaultIcons.map((icon) => {
                  const newCategory = new Category({
                    user: user._id,
                    name: icon.name,
                    type: icon.type,
                    icon: icon.icon
                  })
                  newCategory.save();
                });
                res.json(user)
              })
              .catch(err => console.log(err))
          })
        });
      }
    })
}

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
exports.user_login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //Validate req.body
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);
  //Check validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user by email
  User.findOne({
      email
    })
    .then(user => {

      //check for user
      if (!user) {
        errors.email = 'User not found'
        res.status('400').json(errors)
      }

      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User matched
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            }
            //Sign the token
            jwt.sign(payload, keys.secretOrKey, {
              expiresIn: 3600
            }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            });
          } else {
            errors.password = "Password incorrect";
            return res.status('400').json(errors);
          }
        })
    })
}

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
exports.user_current = (req,res)=>{
  User.findOne({_id}).then(()=>
    res.json({
      id: req.user.id,
      email: req.user.email
    })
  )
}