const { check } = require("express-validator");

const createEditValidationRules = [
  check("name", "Name cannot be empty").trim().notEmpty(),
  check("name", "Name should be more than 2 characters and less than 30").isLength({min:2, max:30}),
  check("description", "Description cannot be empty").trim().notEmpty(),
  check("description", "Description should be more than 5 characters and less than 255").isLength({min: 5, max: 255})
];

module.exports = createEditValidationRules;
