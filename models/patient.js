"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patient.belongsTo(models.therapist, { as: "therapist" });
      patient.belongsToMany(models.therapist, {
        through: "sessions",
        foreignKey: "patientId",
        as: "sessionTherapist",
      });
    }
  }
  patient.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      therapistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "patient",
    }
  );
  return patient;
};
