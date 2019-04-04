const Validator = require('validator');
const isEmpty = require('./../is-empty');

module.exports = function validateExpenseCreationInput(data) {
    let errors = {};

    data.account = !isEmpty(data.account) ? data.account : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.amount = !isEmpty(data.amount) ? data.amount : '';
    data.date = !isEmpty(data.date) ? data.date : '';

    if (Validator.isEmpty(data.account)) {
        errors.account = 'Select an account';
    }
    if (Validator.isEmpty(data.category)) {
        errors.category = 'Select a category';
    }
    if (Validator.isEmpty(data.amount)) {
        errors.amount = 'Amount cannot be empty';
    }
    if (!Validator.isNumeric(data.amount)){
        errors.startingBalance = 'Amount must be a number';
    }
    if (Validator.isEmpty(data.date)) {
        errors.amount = 'Select a date';
    }
    if (!Validator.isISO8601(data.date)) {
        errors.date = 'Date is in the wrong format';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}