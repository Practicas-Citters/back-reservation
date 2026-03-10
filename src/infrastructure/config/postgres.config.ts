import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';
import { SportModel } from '../models/sport.model.js';
import { CourtModel } from '../models/court.model.js';
import { BookingModel } from '../models/booking.model.js';
import { PaymentModel } from '../models/payment.model.js';
import { ScheduleModel } from '../models/schedule.model.js';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    logging: console.log, // Set to false to disable logging
    models: [UserModel, SportModel, CourtModel, BookingModel, PaymentModel, ScheduleModel], // We will add models here as we create them
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
