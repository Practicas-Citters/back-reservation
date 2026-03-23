import { Op } from 'sequelize';
import { Booking, BookingStatus } from '../../domain/entities/booking.entity.js';
import { User } from '../../domain/entities/user.entity.js';
import { Court } from '../../domain/entities/court.entity.js';
import { Sport } from '../../domain/entities/sport.entity.js';
import type { BookingRepository } from '../../domain/repositories/booking.domain.repository.js';
import { BookingModel } from '../models/booking.model.js';
import { UserModel } from '../models/user.model.js';
import { CourtModel } from '../models/court.model.js';
import { SportModel } from '../models/sport.model.js';
import { OrganizationModel } from '../models/organization.model.js';
import { Organization } from '../../domain/entities/organization.entity.js';

export class BookingRepositoryImpl implements BookingRepository {
    /**
     * Create a new booking and persist it to the database.
     * Re-fetches the booking from the database after creation to ensure all
     * database-generated values and associations are included.
     */
    async create(booking: Booking): Promise<Booking> {
        const newBooking = await BookingModel.create({
            id: booking.id,
            userId: booking.user.id,
            courtId: booking.court.id,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            numPeople: booking.numPeople,
            totalPrice: booking.totalPrice,
            status: booking.status
        });

        // We use getById to re-fetch the booking with all its associations (User, Court, Sport)
        // This avoids repeating the complex 'include' configuration already defined in getById.
        const created = await this.getById(newBooking.id);
        if (!created) throw new Error('Error creating booking');
        return created;
    }

    /**
     * Update an existing booking by its ID.
     * Performs a partial update and returns the fully reconstructed entity.
     */
    async update(id: string, booking: Partial<Booking>): Promise<Booking> {
        // Empty object to store the fields to update
        const updateData: any = {};

        //Verify which fields are going to be updated
        if (booking.status) updateData.status = booking.status;
        if (booking.numPeople !== undefined) updateData.numPeople = booking.numPeople;
        if (booking.totalPrice !== undefined) updateData.totalPrice = booking.totalPrice;
        if (booking.date) updateData.date = booking.date;
        if (booking.startTime) updateData.startTime = booking.startTime;
        if (booking.endTime) updateData.endTime = booking.endTime;
        if (booking.user) updateData.userId = booking.user.id;
        if (booking.court) updateData.courtId = booking.court.id;

        // affectedCount is the number of rows affected by the update
        const [affectedCount] = await BookingModel.update(updateData, {
            where: { id }
        });

        if (affectedCount === 0) {
            throw new Error('Booking not found');
        }

        const updated = await this.getById(id);
        if (!updated) throw new Error('Booking not found after update');

        return updated;
    }

    //Delete a booking from the database by its ID.
    async delete(id: string): Promise<boolean> {
        const deletedCount = await BookingModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    //Find a booking by its unique ID.
    async getById(id: string): Promise<Booking | null> {
        // findByPk with 'include' performs JOINs to load related data in a single query
        const model = await BookingModel.findByPk(id, {
            include: [
                { model: UserModel, as: 'user' }, // User who made the booking
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' }, // Sport of the court
                        { model: OrganizationModel, as: 'organization' }    // Organization owner of the court
                    ]
                }
            ]
        });

        if (!model) return null;
        return this.toEntity(model);
    }

    //Retrieve all bookings from the database.
    async getAll(): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings made by a specific user.
    async getByUserId(userId: string): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { userId },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings for a specific court.
    async getByCourtId(courtId: string): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { courtId },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings for a specific date.
    async getByDate(date: string): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { date },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings with a specific status.
    async getByStatus(status: BookingStatus): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { status },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings with a specific total price.
    async getByTotalPrice(totalPrice: number): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { totalPrice },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings starting at a specific time.
    async getByStartTime(startTime: string): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { startTime },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve all bookings ending at a specific time.
    async getByEndTime(endTime: string): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { endTime },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    //Retrieve bookings for a specific user on a specific date.
    async getByUserAndDate(userId: string, date: string): Promise<Booking[]> {
        const models = await BookingModel.findAll({
            where: { userId, date },
            include: [
                { model: UserModel, as: 'user' },
                {
                    model: CourtModel,
                    as: 'court',
                    include: [
                        { model: SportModel, as: 'sport' },
                        { model: UserModel, as: 'user' }
                    ]
                }
            ]
        });

        return models.map(m => this.toEntity(m));
    }

    /**
     * Checks if a court is available for a given time range on a specific date.
     * Considers overlapping bookings that are not cancelled.
     */
    async checkAvailability(courtId: string, date: string, startTime: string, endTime: string): Promise<boolean> {
        const overlappingCount = await BookingModel.count({
            where: {
                courtId, // Filter by specific court
                date,    // Filter by specific date
                status: { [Op.ne]: BookingStatus.CANCELLED }, // Ignore cancelled bookings
                [Op.or]: [
                    {
                        // Scenario 1: Existing booking starts during the requested time
                        startTime: { [Op.gte]: startTime, [Op.lt]: endTime }
                    },
                    {
                        // Scenario 2: Existing booking ends during the requested time
                        endTime: { [Op.gt]: startTime, [Op.lte]: endTime }
                    },
                    {
                        // Scenario 3: Existing booking completely covers the requested time
                        [Op.and]: [
                            { startTime: { [Op.lte]: startTime } },
                            { endTime: { [Op.gte]: endTime } }
                        ]
                    }
                ]
            }
        });

        // Available if no overlapping bookings are found
        return overlappingCount === 0;
    }

    //Map a BookingModel (Sequelize) to a Booking domain entity.
    private toEntity(model: BookingModel): Booking {
        if (!model) throw new Error('Booking model is null');
        if (!model.user) throw new Error('Booking user is null. Ensure "user" association is included.');
        if (!model.court) throw new Error('Booking court is null. Ensure "court" association is included.');

        return new Booking(
            model.id,
            this.userToEntity(model.user),
            this.courtToEntity(model.court),
            model.date,
            model.startTime,
            model.endTime,
            model.numPeople,
            model.totalPrice,
            model.status,
            null, // Payment handled separately
            model.createdAt.toISOString(),
            model.updatedAt.toISOString()
        );
    }

    //Map a UserModel to a User domain entity.
    private userToEntity(model: UserModel): User {
        if (!model) throw new Error('User model is null');
        return new User(
            model.id,
            model.fullName,
            model.username,
            model.email,
            model.password,
            model.phone ?? '',
            model.birthDate,
            model.role,
            model.profilePicture ?? '',
            model.isPremium,
            model.points
        );
    }

    //Map a CourtModel to a Court domain entity.
    private courtToEntity(model: CourtModel): Court {
        if (!model) throw new Error('Court model is null');
        if (!model.sport) throw new Error('Court sport is null. Ensure "sport" association is included.');
        if (!model.organization) throw new Error('Court owner is null. Ensure "organization" association is included for court.');

        return new Court(
            model.id,
            model.name,
            model.description,
            model.image,
            model.capacity,
            model.pricePerHour,
            model.location,
            model.isAvailable,
            this.sportToEntity(model.sport),
            this.organizationToEntity(model.organization) // The organization owner of the court
        );
    }

    private organizationToEntity(model: OrganizationModel): Organization {
        if (!model) throw new Error('Organization model is null');
        return new Organization(
            model.id,
            model.name,
            model.description,
            model.email,
            model.phone,
            model.address,
            model.city,
            model.zipCode,
            model.logo,
            model.bannerImage,
            model.isActive,
            []
        );
    }


    //Map a SportModel to a Sport domain entity.
    private sportToEntity(model: SportModel): Sport {
        if (!model) throw new Error('Sport model is null');
        return new Sport(
            model.id,
            model.name,
            model.iconUrl,
            model.minPlayers,
            model.maxPlayers
        );
    }
}
