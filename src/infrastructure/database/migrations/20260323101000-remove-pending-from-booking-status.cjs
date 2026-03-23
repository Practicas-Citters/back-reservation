'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Update any existing 'pending' bookings to 'confirmed'
    await queryInterface.bulkUpdate('bookings', 
      { status: 'confirmed' }, 
      { status: 'pending' }
    );

    // 2. Change the default value of the 'status' column to 'confirmed'
    // Note: We keep 'pending' in the ENUM type for now to avoid complex migrations,
    // but the code will no longer use it or allow it.
    await queryInterface.changeColumn('bookings', 'status', {
      type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'confirmed'
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert the default value to 'pending'
    await queryInterface.changeColumn('bookings', 'status', {
      type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'pending'
    });
  }
};
