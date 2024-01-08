const postRepository = require("../repositories/PostRepository");

class PostService {
  async getAll() {
    try {
      return await postRepository.getAll();
    } catch (e) {
      console.error(e);
      throw new Error(`PostService Error: ${e.message}`);
    }
  }

  async getByUser(authorId) {
    try {
      return await postRepository.getByUser(authorId);
    } catch (e) {
      console.error(e);
      throw new Error(`PostService Error: ${e.message}`);
    }
  }

  async getOne(id) {
    try {
      return await postRepository.getOne(id);
    } catch (e) {
      console.error(e);
      throw new Error(`PostService Error: ${e.message}`);
    }
  }

  async create(item) {
    try {
      return await postRepository.create(item);
    } catch (e) {
      console.error(e);
      throw new Error(`PostService Error: ${e.message}`);
    }
  }

  async update(item) {
    try {
      return await postRepository.update(item);
    } catch (e) {
      console.error(e);
      throw new Error(`PostService Error: ${e.message}`);
    }
  }

  async delete(id) {
    try {
      return await postRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw new Error(`PostService Error: ${e.message}`);
    }
  }
}

module.exports = new PostService();
