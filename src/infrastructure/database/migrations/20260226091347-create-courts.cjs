'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('courts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            pricePerHour: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            isAvailable: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            sportId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'sports',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
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
        await queryInterface.dropTable('courts');
    }
};
