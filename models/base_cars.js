"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Base_Cars extends Model {
    static associate(models) {
      Base_Cars.hasMany(models.Cars_Trims, { foreignKey: "base_car_id" });
      Base_Cars.belongsTo(models.Manufacturers, {
        foreignKey: "manufacturer_id",
      });
    }
  }
  Base_Cars.init(
    {
      manufacturer_id: DataTypes.INTEGER,
      model: DataTypes.STRING,
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Base_Cars",
      paranoid: true,
    }
  );
  return Base_Cars;
};
