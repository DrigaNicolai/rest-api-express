const tagRepository = require("../repositories/TagRepository");

class TagService {
  async getAll() {
    try {
      return await tagRepository.getAll();
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }

  async getOne(id) {
    try {
      return await tagRepository.getOne(id);
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }

  async findByName(name) {
    try {
      return await tagRepository.findByName(name);
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }

  async create(item) {
    try {
      return await tagRepository.create(item);
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }

  async update(item) {
    try {
      return await tagRepository.update(item);
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }

  async delete(id) {
    try {
      return await tagRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }

  async getList() {
    try {
      return await tagRepository.getList();
    } catch (e) {
      console.error(e);
      throw new Error(`TagService Error: ${e.message}`);
    }
  }
}

module.exports = new TagService();
