'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User);
      Post.belongsTo(models.Tag);
    }
  }
  Post.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id"
        }
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [2, 30]
        }
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [5, 255]
        }
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tag",
          key: "id"
        }
      }
    }, 
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
};
