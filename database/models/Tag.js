'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.hasMany(models.Post);
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [2, 30]
        }
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [5, 255]
        }
      }
    }, 
    {
      sequelize,
      modelName: 'Tag',
    }
  );

  return Tag;
};
