import { Payment, PaymentStatus, PaymentMethod } from "../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../domain/repositories/payment.repository.js";
import { PaymentModel } from "../models/payment.model.js";
import { BookingModel } from "../models/booking.model.js";
import { UserModel } from "../models/user.model.js";
import { CourtModel } from "../models/court.model.js";
import { SportModel } from "../models/sport.model.js";
import { Booking } from "../../domain/entities/booking.entity.js";
import { Court } from "../../domain/entities/court.entity.js";
import { Sport } from "../../domain/entities/sport.entity.js";
import { User } from "../../domain/entities/user.entity.js";

export class PaymentRepositoryImpl implements PaymentRepository {

    /**
     * Create a new payment and persist it to the database.
     */
    async create(payment: Payment): Promise<Payment> {
        const newPayment = await PaymentModel.create({
            id: payment.id,
            amount: payment.amount,
            status: payment.status,
            method: payment.method,
            transactionId: payment.transactionId,
            userId: payment.userId,
            bookingId: payment.booking.id
        });

        const created = await PaymentModel.findByPk(newPayment.id, {
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });

        if (!created) throw new Error('Error creating payment');
        return this.toEntity(created);
    }

    /**
     * Get a payment by its ID from the database.
     */
    async getById(id: string): Promise<Payment | null> {
        const payment = await PaymentModel.findByPk(id, {
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        if (!payment) return null;
        return this.toEntity(payment);
    }

    /**
     * Update an existing payment in the database.
     */
    async update(id: string, updates: Partial<Pick<Payment, 'status' | 'transactionId'>>): Promise<Payment | null> {
        await PaymentModel.update(updates, {
            where: { id }
        });

        return this.getById(id);
    }

    /**
     * Delete a payment by its ID from the database.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await PaymentModel.destroy({
            where: { id }
        });
        return deletedCount > 0;
    }

    /**
     * Get all payments from the database.
     */
    async getAll(): Promise<Payment[]> {
        const payments = await PaymentModel.findAll({
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        return payments.map(p => this.toEntity(p));
    }

    /**
     * Get all payments associated with a specific booking ID.
     */
    async getByBookingId(bookingId: string): Promise<Payment[]> {
        const payments = await PaymentModel.findAll({
            where: { bookingId },
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        return payments.map(p => this.toEntity(p));
    }

    /**
     * Get all payments associated with a specific user ID.
     */
    async getByUserId(userId: string): Promise<Payment[]> {
        const payments = await PaymentModel.findAll({
            where: { userId },
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        return payments.map(p => this.toEntity(p));
    }

    /**
     * Get all payments with a specific status.
     */
    async getByStatus(status: PaymentStatus): Promise<Payment[]> {
        const payments = await PaymentModel.findAll({
            where: { status },
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        return payments.map(p => this.toEntity(p));
    }

    /**
     * Get all payments with a specific payment method.
     */
    async getByMethod(method: PaymentMethod): Promise<Payment[]> {
        const payments = await PaymentModel.findAll({
            where: { method },
            include: [
                {
                    model: BookingModel,
                    include: [
                        {
                            model: CourtModel,
                            include: [SportModel, UserModel]
                        },
                        { model: UserModel }
                    ]
                },
                { model: UserModel }
            ]
        });
        return payments.map(p => this.toEntity(p));
    }

    //Map a PaymentModel (Sequelize) to a Payment domain entity.
    private toEntity(model: any): Payment {
        if (!model) throw new Error('Payment model is null');
        const bookingModel = model.booking;
        if (!bookingModel) throw new Error('Payment booking is null. Ensure "booking" association is included.');
        if (!bookingModel.court) throw new Error('Payment booking court is null.');
        if (!bookingModel.court.sport) throw new Error('Payment booking court sport is null.');
        if (!bookingModel.court.user) throw new Error('Payment booking court owner is null.');
        if (!bookingModel.user) throw new Error('Payment booking user is null.');
        if (!model.user) throw new Error('Payment user is null.');

        const sport = new Sport(
            bookingModel.court.sport.id,
            bookingModel.court.sport.name,
            bookingModel.court.sport.iconUrl,
            bookingModel.court.sport.minPlayers,
            bookingModel.court.sport.maxPlayers
        );

        const owner = new User(
            bookingModel.court.user.id,
            bookingModel.court.user.fullName,
            bookingModel.court.user.username,
            bookingModel.court.user.email,
            bookingModel.court.user.password,
            bookingModel.court.user.phone || '',
            bookingModel.court.user.birthDate,
            bookingModel.court.user.role,
            bookingModel.court.user.profilePicture || '',
            bookingModel.court.user.isPremium,
            bookingModel.court.user.points
        );

        const court = new Court(
            bookingModel.court.id,
            bookingModel.court.name,
            bookingModel.court.description,
            bookingModel.court.image,
            bookingModel.court.capacity,
            bookingModel.court.pricePerHour,
            bookingModel.court.location,
            bookingModel.court.isAvailable,
            sport,
            owner
        );

        const user = new User(
            bookingModel.user.id,
            bookingModel.user.fullName,
            bookingModel.user.username,
            bookingModel.user.email,
            bookingModel.user.password,
            bookingModel.user.phone || '',
            bookingModel.user.birthDate,
            bookingModel.user.role,
            bookingModel.user.profilePicture || '',
            bookingModel.user.isPremium,
            bookingModel.user.points
        );

        const booking = new Booking(
            bookingModel.id,
            user,
            court,
            bookingModel.date,
            bookingModel.startTime,
            bookingModel.endTime,
            bookingModel.numPeople,
            bookingModel.totalPrice,
            bookingModel.status,
            null, // payment (related entity)
            model.createdAt.toISOString(),
            model.createdAt.toISOString() // updatedAt (placeholder)
        );

        return new Payment(
            model.id,
            Number(model.amount),
            model.status,
            model.method,
            model.transactionId,
            model.userId,
            booking,
            model.createdAt.toISOString()
        );
    }
}
