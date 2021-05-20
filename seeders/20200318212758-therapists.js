"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "therapists",
      [
        {
          name: "therapist 1",
          email: "t@t.t",
          password: bcrypt.hashSync("z", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "therapist 2",
          email: "therapist2@clinic.com",
          password: bcrypt.hashSync("z", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("therapists", null, {});
  },
};
