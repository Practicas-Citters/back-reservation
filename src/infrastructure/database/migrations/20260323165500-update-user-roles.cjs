'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const dialect = queryInterface.sequelize.getDialect();

      if (dialect === 'postgres') {
        // Postgres ENUM update process with data mapping
        
        // 1. Drop default value temporarily
        await queryInterface.sequelize.query(
          'ALTER TABLE users ALTER COLUMN role DROP DEFAULT',
          { transaction }
        );
        
        // 2. Rename old type
        await queryInterface.sequelize.query(
          'ALTER TYPE "enum_users_role" RENAME TO "enum_users_role_old"',
          { transaction }
        );
        
        // 3. Create new type with correct values
        await queryInterface.sequelize.query(
          "CREATE TYPE \"enum_users_role\" AS ENUM('admin', 'client', 'manager')",
          { transaction }
        );
        
        // 4. Update column to use new type and map data in one step
        await queryInterface.sequelize.query(
          `ALTER TABLE users ALTER COLUMN role TYPE "enum_users_role" 
           USING (
             CASE 
               WHEN role::text = 'usuario' THEN 'client'::"enum_users_role"
               WHEN role::text = 'superadmin' THEN 'admin'::"enum_users_role"
               ELSE role::text::"enum_users_role"
             END
           )`,
          { transaction }
        );
        
        // 5. Drop old type
        await queryInterface.sequelize.query(
          'DROP TYPE "enum_users_role_old"',
          { transaction }
        );
        
        // 6. Restore default value with new default
        await queryInterface.sequelize.query(
          "ALTER TABLE users ALTER COLUMN role SET DEFAULT 'client'",
          { transaction }
        );
      } else {
        // For other dialects (MySQL/SQLite)
        // First map the data using CASE (might need specialized syntax for MySQL if ENUM is restrictive)
        await queryInterface.sequelize.query(
          "UPDATE users SET role = CASE WHEN role = 'usuario' THEN 'client' WHEN role = 'superadmin' THEN 'admin' ELSE role END",
          { transaction }
        );
        
        await queryInterface.changeColumn('users', 'role', {
          type: Sequelize.ENUM('admin', 'client', 'manager'),
          allowNull: false,
          defaultValue: 'client'
        }, { transaction });
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const dialect = queryInterface.sequelize.getDialect();

      if (dialect === 'postgres') {
        await queryInterface.sequelize.query('ALTER TABLE users ALTER COLUMN role DROP DEFAULT', { transaction });
        await queryInterface.sequelize.query('ALTER TYPE "enum_users_role" RENAME TO "enum_users_role_new"', { transaction });
        await queryInterface.sequelize.query("CREATE TYPE \"enum_users_role\" AS ENUM('superadmin', 'admin', 'usuario')", { transaction });
        
        await queryInterface.sequelize.query(
          `ALTER TABLE users ALTER COLUMN role TYPE "enum_users_role" 
           USING (
             CASE 
               WHEN role::text = 'client' THEN 'usuario'::"enum_users_role"
               WHEN role::text = 'manager' THEN 'usuario'::"enum_users_role"
               ELSE role::text::"enum_users_role"
             END
           )`,
          { transaction }
        );
        
        await queryInterface.sequelize.query('DROP TYPE "enum_users_role_new"', { transaction });
        await queryInterface.sequelize.query("ALTER TABLE users ALTER COLUMN role SET DEFAULT 'usuario'", { transaction });
      } else {
        await queryInterface.sequelize.query(
          "UPDATE users SET role = CASE WHEN role = 'client' OR role = 'manager' THEN 'usuario' ELSE role END",
          { transaction }
        );
        
        await queryInterface.changeColumn('users', 'role', {
          type: Sequelize.ENUM('superadmin', 'admin', 'usuario'),
          allowNull: false,
          defaultValue: 'usuario'
        }, { transaction });
      }
    });
  }
};
