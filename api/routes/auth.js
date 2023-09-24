const Router = require("express");
const { check } = require("express-validator");
const authContoller = require("../controllers/authController");

const router = new Router();

router.post(
  '/register', 
  [
    check("name", "Name cannot be empty").trim().notEmpty(),
    check("name", "Name should be more than 2 characters and less than 50").isLength({min:2, max:50}),
    check("password", "Password cannot be empty").trim().notEmpty(),
    check("password", "Password should be more than 6 characters and less than 50").isLength({min:6, max:50}),
    check("email", "Email cannot be empty").trim().notEmpty(),
    check("email", "Invalid email format").isEmail()
  ], 
  authContoller.register
);

module.exports = router;
