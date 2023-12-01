const Router = require("express");
const registrationValidationRules = require("../validators/auth/RegistationValidation");
const loginValidationRules = require("../validators/auth/LoginValidation");
const authContoller = require("../controllers/authController");

const multer = require("multer");
const upload = multer();

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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityErrorResponse'
 * 
 */
router.post(
  '/register',
  upload.none(),
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       401:
 *         description: User authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUnauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityErrorResponse'
 * 
 */
router.post(
  '/login',
  upload.none(), 
  loginValidationRules,
  authContoller.login
);

module.exports = router;
