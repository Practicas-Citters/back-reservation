'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('bookings');
    if (!tableInfo.numPeople) {
      await queryInterface.addColumn('bookings', 'numPeople', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('bookings', 'numPeople');
  }
};
