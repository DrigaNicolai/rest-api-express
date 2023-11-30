'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarningType extends Model {
    static associate(models) {
      // define association here
    }
  }

  WarningType.init(
    {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          len: [3, 40]
        }
      },
      points_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 16
        }
      }
    }, 
    {
      sequelize,
      modelName: 'WarningType',
    }
  );

  return WarningType;
};
