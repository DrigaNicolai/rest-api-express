'use strict';

/** @type {import('sequelize-cli').Migration} */

const roles = require("../../data/seeders/roles-seeders.json");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", roles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
