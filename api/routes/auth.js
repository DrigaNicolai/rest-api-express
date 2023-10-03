const Router = require("express");
const registrationValidationRules = require("../validators/auth/RegistationValidation");
const authContoller = require("../controllers/authController");

const router = new Router();

router.post(
  '/register', 
  registrationValidationRules,
  authContoller.register
);

module.exports = router;
