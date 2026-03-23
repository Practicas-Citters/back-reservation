'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add organizationId column (allowNull: true to handle existing rows)
    await queryInterface.addColumn('courts', 'organizationId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'organizations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    // 2. Remove userId column and its corresponding foreign key/constraint
    // NOTE: This will lose the data in userId. 
    await queryInterface.removeColumn('courts', 'userId');
  },

  async down(queryInterface, Sequelize) {
    // 1. Add userId column back
    await queryInterface.addColumn('courts', 'userId', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    // 2. Remove organizationId column
    await queryInterface.removeColumn('courts', 'organizationId');
  }
};
