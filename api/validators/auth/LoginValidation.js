const { check } = require("express-validator");

const loginValidationRules = [
  check("email", "Email cannot be empty").trim().notEmpty(),
  check("email", "Invalid email format").isEmail(),
  check("password", "Password cannot be empty").trim().notEmpty(),
  check("password", "Password should be more than 6 characters and less than 50").isLength({min:6, max:50})
];

module.exports = loginValidationRules;
