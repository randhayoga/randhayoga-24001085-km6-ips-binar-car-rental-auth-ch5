"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Manufacturers, {
        foreignKey: "createdBy",
        as: "createdManufacturers",
      });
      Users.hasMany(models.Manufacturers, {
        foreignKey: "updatedBy",
        as: "updatedManufacturers",
      });
      Users.hasMany(models.Manufacturers, {
        foreignKey: "deletedBy",
        as: "deletedManufacturers",
      });
      Users.hasMany(models.Base_Cars, {
        foreignKey: "createdBy",
        as: "createdBase_Cars",
      });
      Users.hasMany(models.Base_Cars, {
        foreignKey: "updatedBy",
        as: "updatedBase_Cars",
      });
      Users.hasMany(models.Base_Cars, {
        foreignKey: "deletedBy",
        as: "deletedBase_Cars",
      });
      Users.hasMany(models.Cars_Trims, {
        foreignKey: "createdBy",
        as: "createdCars_Trims",
      });
      Users.hasMany(models.Cars_Trims, {
        foreignKey: "updatedBy",
        as: "updatedCars_Trims",
      });
      Users.hasMany(models.Cars_Trims, {
        foreignKey: "deletedBy",
        as: "deletedCars_Trims",
      });
      Users.hasMany(models.Fleets, {
        foreignKey: "createdBy",
        as: "createdFleets",
      });
      Users.hasMany(models.Fleets, {
        foreignKey: "updatedBy",
        as: "updatedFleets",
      });
      Users.hasMany(models.Fleets, {
        foreignKey: "deletedBy",
        as: "deletedFleets",
      });
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.TEXT,
      name: DataTypes.STRING,
      photo: DataTypes.TEXT,
      role: DataTypes.ENUM("superadmin", "admin", "user"),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
      paranoid: true,
      timestamps: true,
    }
  );

  return Users;
};
