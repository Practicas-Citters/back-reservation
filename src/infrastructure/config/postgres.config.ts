import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  logging: console.log, // Set to false to disable logging
  models: [UserModel], // We will add models here as we create them
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync(); // Use with caution in production
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); 
    }
};
