const Router = require("express");
const createEditValidationRules = require("../validators/warning-types/CreateValidation");
const warningTypeController = require("../controllers/warningTypeController");

const roleMiddleware = require("../middleware/roleMiddleware");

const multer = require("multer");
const upload = multer();

const router = new Router();

/**
 * @swagger
 * /warning-types:
 *   get:
 *     tags:
 *       - Warning Types
 *     description: Get all Warning Type entities
 *     responses:
 *       200:
 *         description: Warning types catalog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CatalogWarningTypeResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/WarningTypeNotFound'
 */
router.get(
  '/',
  roleMiddleware(["Admin", "Moderator", "User"]),
  warningTypeController.getAll
);

/**
 * @swagger
 * /warning-types:
 *   post:
 *     tags:
 *       - Warning Types
 *     description: Create new warning type
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateWarningTypeRequest'
 *     responses:
 *       201:
 *         description: Warning type was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEditWarningTypeResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityErrorResponse'
 */
router.post(
  '/',
  upload.none(),
  createEditValidationRules,
  roleMiddleware(["Admin"]),
  warningTypeController.create
);

/**
 * @swagger
 * /warning-types/list:
 *   get:
 *     tags:
 *       - Warning Types
 *     description: Get Warning Type entities list
 *     responses:
 *       200:
 *         description: Warning types list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsList'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 */
router.get(
  '/list',
  roleMiddleware(["Admin", "Moderator"]),
  warningTypeController.getList
);

/**
 * @swagger
 * /warning-types/{warning_type}:
 *   get:
 *     tags:
 *       - Warning Types
 *     description: Get a Warning Type entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/WarningTypeId'
 *     responses:
 *       200:
 *         description: Warning type data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/entities/warning-type'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/WarningTypeNotFound'
 */
router.get(
  '/:id',
  roleMiddleware(["Admin"]),
  warningTypeController.getOne
);

/**
 * @swagger
 * /warning-types/{warning_type}:
 *   put:
 *     tags:
 *       - Warning Types
 *     description: Update a Warning Type entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/WarningTypeId'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWarningTypeRequest'
 *     responses:
 *       200:
 *         description: Warning type was update successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEditWarningTypeResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/WarningTypeNotFound'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityErrorResponse'
 */
router.put(
  '/:id',
  createEditValidationRules,
  roleMiddleware(["Admin"]),
  warningTypeController.update
);

/**
 * @swagger
 * /warning-types/{warning_type}:
 *   delete:
 *     tags:
 *       - Warning Types
 *     description: Delete a Warning Type entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/WarningTypeId'
 *     responses:
 *       204:
 *         description: Warning type was deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/WarningTypeNotFound'
 */
router.delete(
  '/:id',
  roleMiddleware(["Admin"]),
  warningTypeController.delete
);

module.exports = router;
