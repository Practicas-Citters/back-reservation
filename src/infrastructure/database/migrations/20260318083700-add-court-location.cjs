'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('courts');
    if (!tableInfo.location) {
      await queryInterface.addColumn('courts', 'location', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('courts', 'location');
  }
};
