"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Manufacturers extends Model {
    static associate(models) {
      Manufacturers.hasMany(models.Base_Cars, {
        foreignKey: "manufacturer_id",
      });
      Manufacturers.belongsTo(models.Users, {
        foreignKey: "createdBy",
      });
      Manufacturers.belongsTo(models.Users, {
        foreignKey: "updatedBy",
      });
      Manufacturers.belongsTo(models.Users, {
        foreignKey: "deletedBy",
      });
    }
  }
  Manufacturers.init(
    {
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Manufacturers",
      paranoid: true,
      timestamps: true,
    }
  );
  return Manufacturers;
};
