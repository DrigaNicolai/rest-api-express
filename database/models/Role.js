'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User);
    }
  }
  Role.init(
    {
      /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },*/
      name: {
        type: DataTypes.STRING(30),
        validate: {
          len: [2, 30]
        }
      }
    }, 
    {
      sequelize,
      modelName: 'Role',
    }
  );

  return Role;
};
