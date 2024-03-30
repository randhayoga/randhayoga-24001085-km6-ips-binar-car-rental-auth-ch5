"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fleets extends Model {
    static associate(models) {
      Fleets.belongsTo(models.Cars_Trims, { foreignKey: "car_trims_id" });
    }
  }
  Fleets.init(
    {
      id: DataTypes.INTEGER,
      car_trims_id: DataTypes.INTEGER,
      plate: DataTypes.STRING,
      availableAt: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      editedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Fleets",
      paranoid: true,
    }
  );
  return Fleets;
};