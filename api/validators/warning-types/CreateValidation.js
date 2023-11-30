const { check } = require("express-validator");

const createEditValidationRules = [
  check("name", "Name cannot be empty").trim().notEmpty(),
  check("name", "Name should be more than 3 characters and less than 40").isLength({min:3, max:40}),
  check("points_number", "Points number cannot be empty").trim().notEmpty(),
  check("points_number", "Poinst number must be a number between 1 and 16").isInt({min: 1, max: 16})
];

module.exports = createEditValidationRules;
