const warningTypeRepository = require("../repositories/WarningTypeRepository");

class WarningTypeService {
  async getAll() {
    try {
      return await warningTypeRepository.getAll();
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }

  async getOne(id) {
    try {
      return await warningTypeRepository.getOne(id);
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }

  async findByName(name) {
    try {
      return await warningTypeRepository.findByName(name);
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }

  async create(item) {
    try {
      return await warningTypeRepository.create(item);
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }

  async update(item) {
    try {
      return await warningTypeRepository.update(item);
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }

  async delete(id) {
    try {
      return await warningTypeRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }

  async getList() {
    try {
      return await warningTypeRepository.getList();
    } catch (e) {
      console.error(e);
      throw new Error(`WarningTypeService Error: ${e.message}`);
    }
  }
};

module.exports = new WarningTypeService();
