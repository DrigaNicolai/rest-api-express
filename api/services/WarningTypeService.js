const warningTypeRepository = require("../repositories/WarningTypeRepository");

class WarningTypeService {
  async getAll() {
    return await warningTypeRepository.getAll();
  }

  async getOne(id) {
    return await warningTypeRepository.getOne(id);
  }

  async create(item) {
    return await warningTypeRepository.create(item);
  }

  async update(id, item) {
    return await warningTypeRepository.update(id, item);
  }

  async delete(id) {
    return await warningTypeRepository.delete(id);
  }

  async getList() {
    return await warningTypeRepository.getList();
  }
};

module.exports = new WarningTypeService();
