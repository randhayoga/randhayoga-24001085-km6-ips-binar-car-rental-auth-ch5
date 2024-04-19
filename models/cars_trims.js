"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars_Trims extends Model {
    static associate(models) {
      Cars_Trims.hasMany(models.Fleets, { foreignKey: "car_trims_id" });
      Cars_Trims.belongsTo(models.Base_Cars, { foreignKey: "base_car_id" });
      Cars_Trims.belongsTo(models.Manufacturers, {
        foreignKey: "manufacturer_id",
      });
      Cars_Trims.belongsTo(models.Users, {
        foreignKey: "createdBy",
      });
      Cars_Trims.belongsTo(models.Users, {
        foreignKey: "updatedBy",
      });
      Cars_Trims.belongsTo(models.Users, {
        foreignKey: "deletedBy",
      });
    }
  }
  Cars_Trims.init(
    {
      base_car_id: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      transmission: DataTypes.STRING,
      image: DataTypes.STRING,
      options: DataTypes.TEXT,
      specs: DataTypes.TEXT,
      capacity: DataTypes.INTEGER,
      rentPerDay: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cars_Trims",
      paranoid: true,
      timestamps: true,
    }
  );
  return Cars_Trims;
};
