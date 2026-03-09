'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            courtId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'courts',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            startTime: {
                type: Sequelize.STRING,
                allowNull: false
            },
            endTime: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numPeople: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            totalPrice: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
                allowNull: false,
                defaultValue: 'pending'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bookings');
        // Note: In some cases, you might want to drop the ENUM type as well if using Postgres
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bookings_status";');
    }
};
