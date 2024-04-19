"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fleets extends Model {
    static associate(models) {
      Fleets.belongsTo(models.Cars_Trims, { foreignKey: "car_trims_id" });
      Fleets.belongsTo(models.Users, {
        foreignKey: "createdBy",
      });
      Fleets.belongsTo(models.Users, {
        foreignKey: "updatedBy",
      });
      Fleets.belongsTo(models.Users, {
        foreignKey: "deletedBy",
      });
    }
  }
  Fleets.init(
    {
      car_trims_id: DataTypes.INTEGER,
      plate: DataTypes.STRING,
      availableAt: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      updatedBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Fleets",
      paranoid: true,
      timestamps: true,
    }
  );
  return Fleets;
};
