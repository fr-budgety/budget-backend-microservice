const Validator = require('validator');
const isEmpty = require('./../is-empty');

module.exports = function validateCategoryCreationInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.icon = !isEmpty(data.icon) ? data.icon : '';

    if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Category name must be between 2 and 30 characters'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Category name field is required';
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = 'Category must have a type';
    }
    if (Validator.isEmpty(data.type)) {
        errors.icon = 'Category must have an icon';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}