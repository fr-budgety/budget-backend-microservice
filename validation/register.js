const Validator = require ('validator');
const isEmpty = require ('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.terms = !isEmpty(data.terms) ? data.terms : '';

   
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    if(data.terms!==true){
        errors.terms = 'Please accept Terms and Conditions';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }
    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = 'Password must be at least 6 characters'
    }
    if(Validator.isEmpty(data.password)){
        errors.password2 = 'Confirm password field is required';
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }



    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}