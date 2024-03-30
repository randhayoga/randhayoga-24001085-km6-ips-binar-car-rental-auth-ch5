"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Manufacturers extends Model {
    static associate(models) {
      Manufacturers.hasMany(models.Base_Cars, {
        foreignKey: "manufacturer_id",
      });
    }
  }
  Manufacturers.init(
    {
      id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      editedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Manufacturers",
      paranoid: true,
    }
  );
  return Manufacturers;
};
