//Load Input validation
const Expense = require('../models/Expense');
const validateExpenseCreationInput = require('../validation/expenses/expense-creation');



// @route   GET api/expense/test
// @desc    Test expense router
// @access  Public
exports.expense_test = (req, res) => res.json({
    msg: 'Expense works'
});

// @route   POST api/expenses
// @desc    Add New Expense
// @access  Private
exports.add_expense = (req, res) => {
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
    new Expense(expenseFields).save().then(expense => res.json(expense)).catch(errors => res.status(400).json(errors));
}

// @route   GET api/expenses
// @desc    Get expenses by user Id
// @access  Private
exports.get_expenses =  (req, res) => {
    const errors = {};
    Expense.find({ user: req.user.id })
        .then(expense => {
            if (expense.length === 0) {
                errors.name = 'You have no expenses'
                return res.status(400).json(errors)
            }
            return res.json(expense)
        })
        .catch(errors => res.status(400).json(errors))
}