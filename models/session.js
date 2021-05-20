"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      session.belongsTo(models.therapist);
      session.belongsTo(models.patient);
    }
  }
  session.init(
    {
      imageUrl: DataTypes.STRING,
      backgroundColor: {
        type: DataTypes.STRING,
        defaultValue: "#f0e6df",
      },
      therapistBrushColor: {
        type: DataTypes.STRING,
        defaultValue: "#ffffff",
      },
      patientBrushColor: {
        type: DataTypes.STRING,
        defaultValue: "#000000",
      },
    },
    {
      sequelize,
      modelName: "session",
    }
  );
  return session;
};
