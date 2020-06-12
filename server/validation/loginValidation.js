//Packages
const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function loginValidation(data) {
    let errors = [];
    if(!data){ data = {} }

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        errors.push("Please enter an email!");
    } else if (!Validator.isEmail(data.email)) {
        errors.push("Email is not valid!");
    }

    if (Validator.isEmpty(data.password)) {
        errors.push("Please enter a password!")
    }
    
    return {
      errors,
      isValid: isEmpty(errors)
    };
};
  