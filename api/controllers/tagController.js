const tagService = require("../services/TagService");
const {
  CreateTagRequestDTO,
  EditTagRequestDTO,
  TagResponseDTO,
  TagCatalogResponseDTO
} = require("../DTO/tags/tagsDTO");
const { ListResponseDTO } = require("../DTO/global/globalDTO");

class TagController {
  async getAll(req, res) {
    try {
      const tags = await tagService.getAll();

      res.status(200).json(new TagCatalogResponseDTO(tags));
    } catch (e) {
      res.status(404).json({message: 'Tags not found'});
    }
  }

  async getOne(req, res) {
    try {
      const tag = await tagService.getOne(req.params.id);

      res.status(200).json(new TagResponseDTO(tag));
    } catch (e) {
      res.status(404).json({message: `Tag with id = ${req.params.id} not found`});
    }
  }

  async create(req, res) {
    try {
      const tagRequest = new CreateTagRequestDTO(
        req.body.name,
        req.body.description
      );
      const tag = await tagService.findByName(tagRequest.name);

      if (tag) {
        res.status(422).json({message: `Tag with this name alreadt exists`});

        return;
      }

      const tagResponse = await tagService.create(tagRequest);

      res.status(201).json(new TagResponseDTO(tagResponse));
    } catch (e) {
      res.status(400).json({message: `Create tag error: ${JSON.stringify(e)}`});
    }
  }

  async update(req, res) {
    try {
      const tagRequest = new EditTagRequestDTO(
        req.params.id,
        req.body.name,
        req.body.description
      );
      const tag = await tagService.getOne(tagRequest.id);

      if (!tag) {
        res.status(404).json({message: `Tag with id = ${tagRequest.id} not found`});
      }

      const tagResponse = await tagService.update(tagRequest);

      res.status(200).json(new TagResponseDTO(tagResponse));
    } catch (e) {
      res.status(400).json({message: `Edit tag error: ${JSON.stringify(e)}`});
    }
  }

  async delete(req, res) {
    try {
      const tagId = req.params.id;
      const tag = await tagService.getOne(tagId);

      if (!tag) {
        res.status(404).json({message: `Tag with id = ${tagId} not found`});
      }

      res.status(204).json(await tagService.delete(tagId));
    } catch (e) {
      res.status(400).json({message: `Delete tag error: ${JSON.stringify(e)}`});
    }
  }

  async getList(req, res) {
    try {
      const tagsList = await tagService.getList();

      res.status(200).json(new ListResponseDTO(tagsList));
    } catch (e) {
      res.status(400).json({message: `Get tag list error: ${JSON.stringify(e)}`});
    }
  }
}

module.exports = new TagController();
