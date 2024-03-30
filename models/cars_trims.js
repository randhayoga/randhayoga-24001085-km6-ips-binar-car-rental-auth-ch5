"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars_Trims extends Model {
    static associate(models) {
      Cars_Trims.hasMany(models.Fleets, { foreignKey: "car_trims_id" });
      Cars_Trims.belongsTo(models.Base_Cars, { foreignKey: "base_car_id" });
    }
  }
  Cars_Trims.init(
    {
      id: DataTypes.INTEGER,
      base_car_id: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      transmission: DataTypes.STRING,
      image: DataTypes.STRING,
      options: DataTypes.TEXT,
      specs: DataTypes.TEXT,
      capacity: DataTypes.INTEGER,
      rentPerDay: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      editedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Cars_Trims",
      paranoid: true,
    }
  );
  return Cars_Trims;
};
