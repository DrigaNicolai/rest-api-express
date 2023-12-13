const warningTypeService = require("../services/WarningTypeService");
const {
  CreateWarningTypeRequestDTO,
  EditWarningTypeRequestDTO,
  WarningTypeResponseDTO,
  WarningTypeCatalogResponseDTO
} = require("../DTO/warning_types/warningTypesDTO");
const { ListResponseDTO } = require("../DTO/global/globalDTO");

class WarningTypeController {
  async getAll(req, res) {
    try {
      const warningTypes = await warningTypeService.getAll();

      res.status(200).json(new WarningTypeCatalogResponseDTO(warningTypes));
    } catch (e) {
      res.status(404).json({message: 'Warning types not found'});
    }
  }

  async getOne(req, res) {
    try {
      const warningType = await warningTypeService.getOne(req.params.id);

      res.status(200).json(new WarningTypeResponseDTO(warningType));
    } catch (e) {
      res.status(404).json({message: `Warning type with id = ${req.params.id} not found`});
    }
  }

  async create(req, res) {
    try {
      const warningTypeRequest = new CreateWarningTypeRequestDTO(
        req.body.name,
        req.body.points_number
      );
      const warningType = await warningTypeService.findByName(warningTypeRequest.name);

      if (warningType) {
        res.status(422).json({message: `Warning type with this name already exists`});
        
        return;
      }
      const warningTypeResponse = await warningTypeService.create(warningTypeRequest);

      res.status(201).json(new WarningTypeResponseDTO(warningTypeResponse));
    } catch (e) {
      res.status(400).json({message: `Create warning type error: ${JSON.stringify(e)}`});
    }
  }

  async update(req, res) {
    try {
      const warningTypeRequest = new EditWarningTypeRequestDTO(
        req.params.id,
        req.body.name,
        req.body.points_number
      );
      const warningType = await warningTypeService.getOne(warningTypeRequest.id);

      if (!warningType) {
        res.status(404).json({message: `Warning type with id = ${warningTypeRequest.id} not found`});
      }
      const warningTypeResponse = await warningTypeService.update(warningTypeRequest)

      res.status(200).json(new WarningTypeResponseDTO(warningTypeResponse));
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
      const warningTypesList = await warningTypeService.getList();

      res.status(200).json(new ListResponseDTO(warningTypesList));
    } catch (e) {
      res.status(400).json({message: `Get warning type list error: ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new WarningTypeController();
