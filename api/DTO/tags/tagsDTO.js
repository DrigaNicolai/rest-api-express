class CreateTagRequestDTO {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

class EditTagRequestDTO {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

class TagResponseDTO {
  constructor(tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.description = tag.description;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }
}

class TagCatalogResponseDTO {
  constructor(tags) {
    this.items = tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      description: tag.description,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt
    }));
  }
}

module.exports = {
  CreateTagRequestDTO,
  EditTagRequestDTO,
  TagResponseDTO,
  TagCatalogResponseDTO
}
