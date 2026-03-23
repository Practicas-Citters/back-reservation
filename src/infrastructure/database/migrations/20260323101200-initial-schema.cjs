'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableExists = async (tableName) => {
      try {
        await queryInterface.describeTable(tableName);
        return true;
      } catch (error) {
        return false;
      }
    };

    // 1. Create 'users' table
    if (!(await tableExists('users'))) {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        fullName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        birthDate: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.ENUM('superadmin', 'admin', 'usuario'),
          allowNull: false,
          defaultValue: 'usuario'
        },
        profilePicture: {
          type: Sequelize.STRING,
          allowNull: true
        },
        isPremium: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        points: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
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
    }

    // 2. Create 'sports' table
    if (!(await tableExists('sports'))) {
      await queryInterface.createTable('sports', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        iconUrl: {
          type: Sequelize.STRING,
          allowNull: false
        },
        minPlayers: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        maxPlayers: {
          type: Sequelize.INTEGER,
          allowNull: false
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
    }

    // 3. Create 'organizations' table
    if (!(await tableExists('organizations'))) {
      await queryInterface.createTable('organizations', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        zipCode: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        logo: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        bannerImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        managers: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
          defaultValue: [],
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    }

    // 4. Create 'courts' table
    if (!(await tableExists('courts'))) {
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
        location: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
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
    }

    // 5. Create 'bookings' table
    if (!(await tableExists('bookings'))) {
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
          allowNull: false,
          defaultValue: 0
        },
        totalPrice: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
          allowNull: false,
          defaultValue: 'confirmed'
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
    }

    // 6. Create 'payments' table
    if (!(await tableExists('payments'))) {
      await queryInterface.createTable('payments', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded'),
          allowNull: false,
          defaultValue: 'pending'
        },
        method: {
          type: Sequelize.ENUM('stripe', 'paypal', 'cash', 'card'),
          allowNull: false
        },
        transactionId: {
          type: Sequelize.STRING,
          allowNull: true
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        bookingId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'bookings', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
    }

    // 7. Create 'schedules' table
    if (!(await tableExists('schedules'))) {
      await queryInterface.createTable('schedules', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        dayOfWeek: {
          type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
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
        isAvailable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        courtId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'courts',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop in reverse order of creation to avoid foreign key constraints
    await queryInterface.dropTable('schedules');
    await queryInterface.dropTable('payments');
    await queryInterface.dropTable('bookings');
    await queryInterface.dropTable('courts');
    await queryInterface.dropTable('organizations');
    await queryInterface.dropTable('sports');
    await queryInterface.dropTable('users');
    
    // Drop ENUM types if using Postgres
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_bookings_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_method";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_schedules_dayOfWeek";');
  }
};
