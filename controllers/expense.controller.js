//Load Input validation
<<<<<<< HEAD
const Expense = require('../models/Expense');
const validateExpenseCreationInput = require('../validation/expenses/expense-creation');



// @route   GET api/expense/test
// @desc    Test expense router
// @access  Public
exports.expense_test = (req, res) => res.json({
    msg: 'Expense works'
});
=======
const validateExpenseCreationInput = require('../validation/expenses/expense-creation');
const Expense = require('../models/Expense');
const Account = require('../models/Account');
const Category = require('../models/Category');

// @route   GET api/expenses/test
// @desc    Test expenses router
// @access  Public
exports.expense_test = (req,res) => {
  return res.json({msg: 'Expense route works'});
}
>>>>>>> 3ac58f97392c4202fc879eb3e73cce2fde607da0

// @route   POST api/expenses
// @desc    Add New Expense
// @access  Private
exports.add_expense = (req, res) => {
<<<<<<< HEAD
    const { errors, isValid } = validateExpenseCreationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //Fill with fields
    const expenseFields = {};
    expenseFields.user = req.user.id;
    if (req.body.account) expenseFields.account = req.body.account;
    if (req.body.type) expenseFields.type = req.body.type;
    if (req.body.category) expenseFields.category = req.body.category;
    if (req.body.amount) expenseFields.amount = req.body.amount;
    if (req.body.date) expenseFields.date = req.body.date;
    if (req.body.description) expenseFields.description = req.body.description;
    if (req.body.beneficiary) expenseFields.beneficiary = req.body.beneficiary;

    //Create new Expense
    new Expense(expenseFields).save().then(expense => res.json(expense));
}

// @route   GET api/expenses
// @desc    Get expenses by user Id
// @access  Private
exports.get_expenses =  (req, res) => {
    const errors = {};
    Expense.find({
            user: req.user.id
        })
        .then(expense => {
            if (expense.length === 0) {
                errors.name = 'You have no expenses'
                return res.status(400).json(errors)
            }
            return res.json(expense)
        })
=======
  const { errors, isValid } = validateExpenseCreationInput(req.body);
  if (!isValid) {
      return res.status(400).json(errors);
  }
  const expenseFields = {
      //Refs
      user: '',
      account: '',
      category: '',
      //Basic fields
      type: '',
      amount: '',
      date: '',
      description: '',
      beneficiary: ''
  }
  //Populate basic fields: amount, description, beneficiary, date, type
  expenseFields.user = req.user.id;
  expenseFields.account = req.body.account;
  expenseFields.category = req.body.category
  expenseFields.type = req.body.type;
  expenseFields.amount = req.body.amount;
  expenseFields.date = req.body.date;
  if(req.body.description) expenseFields.description = req.body.description;
  if(req.body.beneficiary) expenseFields.beneficiary = req.body.beneficiary;
  //Save Expense to DB
  new Expense(expenseFields).save()
  .then(expense => {
      Account.findOneAndUpdate({_id: expenseFields.account}, {$push: {expenses:expense.id }}, {new:false}).then(ss=>console.log(ss)).catch(err=>console.log('error: ', err))    
      Category.findByIdAndUpdate({_id: expenseFields.category}, {$push: {expenses:expense.id}}, {new:false}).then(ss=>console.log(ss)).catch(err=>console.log('error: ', err))  
      res.json(expense)
  })
  .catch(err=>console.log('Error creating a new expense: ', err));
>>>>>>> 3ac58f97392c4202fc879eb3e73cce2fde607da0
}