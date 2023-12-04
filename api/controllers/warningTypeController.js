const warningTypeService = require("../services/WarningTypeService");

class WarningTypeController {
  async getAll(req, res) {
    try {
      res.status(200).json(await warningTypeService.getAll());
    } catch (e) {
      res.status(404).json({message: 'Warning types not found'});
    }
  }

  async getOne(req, res) {
    try {
      res.status(200).json(await warningTypeService.getOne(req.params.id));
    } catch (e) {
      res.status(404).json({message: `Warning type with id = ${req.params.id} not found`});
    }
  }

  async create(req, res) {
    try {
      const warningType = await warningTypeService.findByName(req.body.name);

      if (warningType) {
        res.status(422).json({message: `Warning type with this name already exists`});
        
        return;
      }

      res.status(201).json(await warningTypeService.create(req.body));
    } catch (e) {
      res.status(400).json({message: `Create warning type error: ${JSON.stringify(e)}`});
    }
  }

  async update(req, res) {
    try {
      const warningTypeId = req.params.id;
      const warningType = await warningTypeService.getOne(warningTypeId);

      if (!warningType) {
        res.status(404).json({message: `Warning type with id = ${warningTypeId} not found`});
      }

      res.status(200).json(await warningTypeService.update(warningTypeId, req.body));
    } catch (e) {
      res.status(400).json({message: `Edit warning type error: ${JSON.stringify(e)}`});
    }
  }

  async delete(req, res) {
    try {
      const warningTypeId = req.params.id;
      const warningType = await warningTypeService.getOne(warningTypeId);

      if (!warningType) {
        res.status(404).json({message: `Warning type with id = ${warningTypeId} not found`});
      }

      res.status(204).json(await warningTypeService.delete(warningTypeId));
    } catch (e) {
      res.status(400).json({message: `Delete warning type error: ${JSON.stringify(e)}`});
    }
  }

  async getList(req, res) {
    try {
      res.status(200).json(await warningTypeService.getList());
    } catch (e) {
      res.status(400).json({message: `Get warning type list error: ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new WarningTypeController();
