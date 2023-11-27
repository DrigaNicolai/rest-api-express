const Router = require("express");
const registrationValidationRules = require("../validators/auth/RegistationValidation");
const authContoller = require("../controllers/authController");
const loginValidationRules = require("../validators/auth/LoginValidation");

const router = new Router();

router.post(
  '/register', 
  registrationValidationRules,
  authContoller.register
);
router.post(
  '/login',
  loginValidationRules,
  authContoller.login
);

module.exports = router;
