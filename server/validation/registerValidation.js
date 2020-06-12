//Packages
const Validator = require("validator");
const isEmpty = require("is-empty");

//App Vars
const minPasswordLength = 6;
const maxPasswordLength = 60;

module.exports = function registerValidation(data) {
    let errors = [];
    if(!data){ data = {} }

    //Convert empty fields to an empty string so we can use validator function
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Empty Checks
    if(Validator.isEmpty(data.email)){
        errors.push('Please enter an email.')
    }else if(!Validator.isEmail(data.email)){
        errors.push('Email is not valid.')
    }

    if (Validator.isEmpty(data.password)) {
        errors.push("Please enter a password");
    }
      
    if (Validator.isEmpty(data.password2)) {
        errors.push("Please enter repeated password.")
    }

    if (!Validator.isLength(data.password, { min: minPasswordLength, max: maxPasswordLength })) {
        errors.push("Password must be at least 6 characters.")
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.push("Passwords must match.")
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}