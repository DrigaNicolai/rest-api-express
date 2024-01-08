const Router = require("express");
const createEditValidationRules = require("../validators/posts/CreateValidation");
const postController = require("../controllers/postController");

const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer();

const router = new Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     description: Get all Post entities
 *     responses:
 *       200:
 *         description: Posts catalog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CatalogPostResponse'
 *       404:
 *         $ref: '#/components/responses/PostNotFound'
 */
router.get(
  '/',
  postController.getAll
);

/**
 * @swagger
 * /posts:
 *   post:
 *     tags:
 *       - Posts
 *     description: Create new post
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       201:
 *         description: Post was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEditPostResponse'
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
  // roleMiddleware(["Admin", "Moderator", "User"]),
  authMiddleware,
  postController.create
);

/**
 * @swagger
 * /posts/user/{user}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Get Posts by `user_id`
 *     parameters:
 *       - $ref: '#/components/schemas/UserId'
 *     responses:
 *       200:
 *         description: User posts catalog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CatalogPostResponse'
 *       404:
 *         $ref: '#/components/responses/PostNotFound'
 */
router.get(
  '/user/:id',
  postController.getByUser
)

/**
 * @swagger
 * /posts/{post}:
 *   get:
 *     tags:
 *       - Posts
 *     description: Get a Post entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/PostId'
 *     responses:
 *       200:
 *         description: Post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/entities/postCreateEdit'
 *       403:
 *         $ref: '#/components/responses/WrongPostAuthor'
 *       404:
 *         $ref: '#/components/responses/PostNotFound'
 */
router.get(
  '/:id',
  // roleMiddleware(["Admin", "Moderator", "User"]),
  authMiddleware,
  postController.getOne
);

/**
 * @swagger
 * /posts/{post}:
 *   put:
 *     tags:
 *       - Posts
 *     description: Update a Post entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/PostId'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostRequest'
 *     responses:
 *       200:
 *         description: Post was update successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEditPostResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/PostNotFound'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntityErrorResponse'
 */
router.put(
  '/:id',
  createEditValidationRules,
  // roleMiddleware(["Admin", "Moderator"]),
  authMiddleware,
  postController.update
);

/**
 * @swagger
 * /posts/{post}:
 *   delete:
 *     tags:
 *       - Posts
 *     description: Delete a Post entity by `id`
 *     parameters:
 *       - $ref: '#/components/schemas/PostId'
 *     responses:
 *       204:
 *         description: Post was deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequestErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UserUnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/PostNotFound'
 */
router.delete(
  '/:id',
  // roleMiddleware(["Admin"]),
  authMiddleware,
  postController.delete
);

module.exports = router;
