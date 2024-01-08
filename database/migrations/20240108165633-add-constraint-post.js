'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Posts", {
      fields: ["author_id"],
      type: "foreign key",
      name: "fk_author_id",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "CASCADE"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Posts", "fk_author_id");
  }
};
