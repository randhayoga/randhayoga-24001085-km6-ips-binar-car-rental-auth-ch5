"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Base_Cars extends Model {
    static associate(models) {
      Base_Cars.hasMany(models.Cars_Trims, { foreignKey: "base_car_id" });
      Base_Cars.belongsTo(models.Manufacturers, {
        foreignKey: "manufacturer_id",
      });
      Base_Cars.belongsTo(models.Users, {
        foreignKey: "createdBy",
      });
      Base_Cars.belongsTo(models.Users, {
        foreignKey: "updatedBy",
      });
      Base_Cars.belongsTo(models.Users, {
        foreignKey: "deletedBy",
      });
    }
  }
  Base_Cars.init(
    {
      manufacturer_id: DataTypes.INTEGER,
      model: DataTypes.STRING,
      type: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Base_Cars",
      paranoid: true,
      timestamps: true,
    }
  );
  return Base_Cars;
};
