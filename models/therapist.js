"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class therapist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      therapist.hasMany(models.patient);
      therapist.hasMany(models.session);
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
