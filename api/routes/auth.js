const Router = require("express");
const registrationValidationRules = require("../validators/auth/RegistationValidation");
const authContoller = require("../controllers/authController");
const loginValidationRules = require("../validators/auth/LoginValidation");

const router = new Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     description: Register a new user
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponse'
 *       422:
 *         description: User registration failed (request validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnprocessableEntity'
 * 
 */
router.post(
  '/register', 
  registrationValidationRules,
  authContoller.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login as existent user
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: User authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUnauthorized'
 *       422:
 *         description: User authentication failed (request validation error)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnprocessableEntity'
 * 
 */
router.post(
  '/login',
  loginValidationRules,
  authContoller.login
);

module.exports = router;
