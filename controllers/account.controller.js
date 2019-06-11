//Load Input validation
const validateAccountCreationInput = require('../validation/accounts/account-creation');
const Account = require('../models/Account');


// @route   GET api/accounts/test
// @desc    Test accounts router
// @access  Public
exports.account_test = (req, res) => res.json({
    msg: 'Account works'
});

// @route   POST api/accounts/add/account
// @desc    Add New Account or Edit if :id is supplied
// @access  Private
exports.add_account = (req, res) => {
    const { errors, isValid } = validateAccountCreationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Fill with fields
    const accountFields = {};
    accountFields.user = req.user.id;
    if (req.body.name) accountFields.name = req.body.name;
    if (req.body.startingBalance) accountFields.startingBalance = req.body.startingBalance;
    //Check if account already exists or create a new one
    Account.findOne({
            name: accountFields.name
        })
        .then(account => {
            if (account) {
                errors.name = 'The account name already exists'
                return res.status(400).json(errors)
            } else {
                new Account(accountFields).save().then(account => res.json(account));
            }
        })
        .catch(err=>res.status(400).json(errors))
}
// @route   POST api/accounts/edit/:id
// @desc    Edit if :id is supplied
// @access  Private
exports.edit_account = (req, res) => {
    const { errors, isValid } = validateAccountCreationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Fill with fields
    const accountFields = {};
    accountFields.user = req.user.id;
    accountFields.id = req.params.id;
    if (req.body.name) accountFields.name = req.body.name;
    if (req.body.startingBalance) accountFields.startingBalance = req.body.startingBalance;
    
    //Find Account and update it
    Account.findOneAndUpdate({_id: accountFields.id}, {$set: accountFields}, {new: true})
    .then(account => {
        res.json(account)}
    ).catch(err => console.log('Unable to update the account: ', err));
}


// @route   GET api/accounts
// @desc    Retrieve all accounts
// @access  Private

//@ToDo Populate expenses
exports.all_accounts = (req, res) => {
    const errors = {};
    Account.find({ user: req.user.id }).populate('expenses')
        .then(accounts => {
            if (accounts.length === 0) {
                errors.accounts = 'You have no accounts'
                return res.status(400).json(errors)
            }
            return res.json(accounts)
        })

}

// @route   DELETE api/accounts/:id
// @desc    Delete an account by id
// @access  Private

exports.delete_account = (req, res) => {
    Account.findById(req.params.id).populate('expenses')
    .then(account => {
        //Check for account owner
        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({
                notauthorized: 'User not authorized'
            })
        }
        //Delete
        account.remove().then(() => res.json({
            success: true
        }));
    })
}


// @route   GET api/accounts/:id
// @desc    Get an account by id
// @access  Private
exports.single_account = (req, res) => {
    const errors = {};
    Account.findOne({
            _id: req.params.id
        }).populate('expenses')
        .then(account => {
            if (!account) {
                errors.noaccount = `Invalid Account`;
                res.status(404).json(errors);
            }
            res.json(account);
        })
        .catch(err => res.status(404).json(err));
}