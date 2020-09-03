"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Journey.belongsTo(models.User, {
        as: "users",
        foreignKey: "userId",
      });
      Journey.belongsToMany(models.User, {
        as: "user",
        through: {
          model: "Bookmarks",
          as: "bookmarks",
        },
      });
    }
  }
  Journey.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Journey",
    }
  );
  return Journey;
};
