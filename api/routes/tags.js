const Router = require("express");
const createEditValidationRules = require("../validators/tags/CreateValidation");
const tagController = require("../controllers/tagController");

const roleMiddleware = require("../middleware/roleMiddleware");

const multer = require("multer");
const upload = multer();

const router = new Router();

/**
 * @swagger
 * /tags:
 *   get:
 *     tags:
 *       - Tags
 *     description: Get all Tag entities
 *     responses:
 *       200:
 *         description: Tags catalog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CatalogTagResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/TagNotFound'
 */
router.get(
  '/',
  roleMiddleware(["Admin", "Moderator", "User"]),
  tagController.getAll
);

/**
 * @swagger
 * /tags:
 *   post:
 *     tags:
 *       - Tags
 *     description: Create new tag
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateTagRequest'
 *     responses:
 *       201:
 *         description: Tag was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEditTagResponse'
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
  roleMiddleware(["Admin", "Moderator"]),
  tagController.create
);

/**
 * @swagger
 * /tags/list:
 *   get:
 *     tags:
 *       - Tags
 *     description: Get Tag entities list
 *     responses:
 *       200:
 *         description: Tags list
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
  tagController.getList
);

/**
 * @swagger
 * /tags/{tag}:
 *   get:
 *     tags:
 *       - Tags
 *     description: Get a Tag entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/TagId'
 *     responses:
 *       200:
 *         description: Tag data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/entities/tag'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/TagNotFound'
 */
router.get(
  '/:id',
  roleMiddleware(["Admin", "Moderator"]),
  tagController.getOne
);

/**
 * @swagger
 * /tags/{tag}:
 *   put:
 *     tags:
 *       - Tags
 *     description: Update a Tag entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/TagId'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTagRequest'
 *     responses:
 *       200:
 *         description: Tag was update successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEditTagResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/TagNotFound'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityErrorResponse'
 */
router.put(
  '/:id',
  createEditValidationRules,
  roleMiddleware(["Admin", "Moderator"]),
  tagController.update
);

/**
 * @swagger
 * /tags/{tag}:
 *   delete:
 *     tags:
 *       - Tags
 *     description: Delete a Tag entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/TagId'
 *     responses:
 *       204:
 *         description: Tag was deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/TagNotFound'
 */
router.delete(
  '/:id',
  roleMiddleware(["Admin"]),
  tagController.delete
);

module.exports = router;
