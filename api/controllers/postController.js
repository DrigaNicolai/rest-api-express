const postService = require("../services/PostService");
const {
  CreatePostRequestDTO,
  EditPostRequestDTO,
  PostResponseDTO,
  PostCatalogResponseDTO
} = require("../DTO/posts/postsDTO");

class PostContoller {
  async getAll(req, res) {
    try {
      const posts = await postService.getAll();

      res.status(200).json(new PostCatalogResponseDTO(posts));
    } catch (e) {
      res.status(404).json({message: 'Posts not found'})
    }
  }

  async getByUser(req, res) {
    try {
      const posts = await postService.getByUser(req.params.id);

      res.status(200).json(new PostCatalogResponseDTO(posts));
    } catch (e) {
      res.status(404).json({message: 'Posts for user with such id not found'});
    }
  }

  async getOne(req, res) {
    try {
      const post = await postService.getOne(req.params.id);

      if (post.author_id !== req.user.id) {
        res.status(403).json({message: `Post's author is different from current user`})
      }

      res.status(200).json(new PostResponseDTO(post));
    } catch (e) {
      res.status(404).json({message: `Post with id = ${req.params.id} not found`});
    }
  }

  async create(req, res) {
    try {
      const postRequest = new CreatePostRequestDTO(
        req.user.id,
        req.body.title,
        req.body.text,
        req.body.tag_id
      );

      const postResponse = await postService.create(postRequest);

      res.status(201).json(new PostResponseDTO(postResponse));
    } catch (e) {
      res.status(400).json({message: `Create post error: ${JSON.stringify(e)}`});
    }
  }

  async update(req, res) {
    try {
      const postRequest = new EditPostRequestDTO(
        req.params.id,
        req.user.id,
        req.body.title,
        req.body.text,
        req.body.tag_id
      );
      const post = await postService.getOne(postRequest.id);

      if (!post) {
        res.status(404).json({message: `Post with id = ${postRequest.id} not found`});
      }

      if (post.author_id !== postRequest.author_id) {
        res.status(403).json({message: `Post's author is different from current user`})
      }

      const postResponse = await postService.update(postRequest);

      res.status(200).json(new PostResponseDTO(postResponse));
    } catch (e) {
      res.status(400).json({message: `Edit post error: ${JSON.stringify(e)}`});
    }
  }

  async delete(req, res) {
    try {
      const postId = req.params.id;
      const post = await postService.getOne(postId);

      if (!post) {
        res.status(404).json({message: `Post with id = ${postId} not found`});
      }

      if (post.author_id !== req.user.id) {
        res.status(403).json({message: `Post's author is different from current user`})
      }

      res.status(204).json(await postService.delete(postId));
    } catch (e) {
      res.status(400).json({message: `Delete post error: ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new PostContoller();
