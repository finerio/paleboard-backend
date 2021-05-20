"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "patients",
      [
        {
          name: "patient 1",
          email: "p@p.p",
          password: bcrypt.hashSync("z", SALT_ROUNDS),
          therapistId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "patient 2",
          email: "patient2@email.com",
          password: bcrypt.hashSync("z", SALT_ROUNDS),
          therapistId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "patient 3",
          email: "patient3@email.com",
          password: bcrypt.hashSync("z", SALT_ROUNDS),
          therapistId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("patients", null, {});
  },
};
