const Validator = require('validator');
const isEmpty = require('./../is-empty');

module.exports = function validateAccountCreationInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.startingBalance = !isEmpty(data.startingBalance) ? data.startingBalance : '';

    if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Account name must be between 2 and 30 characters'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Account name field is required';
    }
    if (Validator.isEmpty(data.startingBalance)) {
        errors.startingBalance = 'Starting Balance is required';
    }
    if (!Validator.isNumeric(data.startingBalance)){
        errors.startingBalance = 'Starting Balance must be a number';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}