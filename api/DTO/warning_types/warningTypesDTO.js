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
  constructor(id, name, points_number) {
    this.id = id;
    this.name = name;
    this.points_number = points_number;
  }
}

class WarningTypeCatalogResponseDTO {
  constructor(warningTypes) {
    this.items = warningTypes.map(warningType => ({
      id: warningType.id,
      name: warningType.name,
      points_number: warningType.points_number,
    }));
  }
}

module.exports = {
  CreateWarningTypeRequestDTO,
  EditWarningTypeRequestDTO,
  WarningTypeResponseDTO,
  WarningTypeCatalogResponseDTO
}
