const { check } = require("express-validator");

const createEditValidationRules = [
  check("author_id", "author_id should be an integer").isInt(),
  check("author_id", "author_id is required").trim().notEmpty(),
  check("title", "title cannot be empty").trim().notEmpty(),
  check("title", "title should be more than 2 characters and less than 30").isLength({min:2, max:30}),
  check("text", "text cannot be empty").trim().notEmpty(),
  check("text", "title should be more than 5 characters and less than 255").isLength({min:5, max:255}),
  check("tag_id", "tag should be an integer").isInt(),
  check("tag_id", "tag is required").trim().notEmpty(),
];

module.exports = createEditValidationRules;
