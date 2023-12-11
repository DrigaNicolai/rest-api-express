class CreateWarningTypeRequestDTO {
  constructor(name, points_number) {
    this.name = name;
    this.points_number = points_number;
  }
}

class EditWarningTypeRequestDTO {
  constructor(id, name, points_number) {
    this.id = id;
    this.name = name;
    this.points_number = points_number;
  }
}

class WarningTypeResponseDTO {
  constructor(warningType) {
    this.id = warningType.id;
    this.name = warningType.name;
    this.points_number = warningType.points_number;
    this.createdAt = warningType.createdAt;
    this.updatedAt = warningType.updatedAt;
  }
}

class WarningTypeCatalogResponseDTO {
  constructor(warningTypes) {
    this.items = warningTypes.map(warningType => ({
      id: warningType.id,
      name: warningType.name,
      points_number: warningType.points_number,
      createdAt: warningType.createdAt,
      updatedAt: warningType.updatedAt
    }));
  }
}

module.exports = {
  CreateWarningTypeRequestDTO,
  EditWarningTypeRequestDTO,
  WarningTypeResponseDTO,
  WarningTypeCatalogResponseDTO
}
