'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Literature.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
        as: 'user',
      });
      Literature.hasMany(models.Bookmark, {
        foreignKey: 'literatureId',
        as: 'bookmarks',
      });
    }
  }
  Literature.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      month: DataTypes.STRING,
      year: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      author: DataTypes.STRING,
      file: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Literature',
    }
  );
  return Literature;
};
