"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("sessions", "therapistId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("sessions", "patientId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "patients",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("patients", "therapistId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "therapists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("sessions", "therapistId");
    await queryInterface.removeColumn("sessions", "patientId");
    await queryInterface.removeColumn("patients", "therapistId");
  },
};
