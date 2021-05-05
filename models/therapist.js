"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class therapist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //   patient.belongsTo(models.therapist, { as: "patient" });
    //   patient.belongsToMany(models.therapist, {
    //     through: "sessions",
    //     foreignKey: "patientId",
    //     as: "sessionPatient",
    //   });

    static associate(models) {
      therapist.hasMany(models.patient, { as: "patient" });
      therapist.belongsToMany(models.patient, {
        through: "sessions",
        foreignKey: "therapistId",
        as: "sessionPatient",
      });
    }
  }
  therapist.init(
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
    },
    {
      sequelize,
      modelName: "therapist",
    }
  );
  return therapist;
};
