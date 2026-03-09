import type { CourtRepository } from '../../domain/repositories/court.domain.repository.js';
import { Court } from '../../domain/entities/court.entity.js';
import { CourtModel } from '../models/court.model.js';
import { SportModel } from '../models/sport.model.js';
import { UserModel } from '../models/user.model.js';
import { Sport } from '../../domain/entities/sport.entity.js';
import { User } from '../../domain/entities/user.entity.js';

export class CourtRepositoryImpl implements CourtRepository {
    /**
     * Create a new court and persist it to the database.
     * Re-fetches the court with full associations (Sport and User).
     */
    async create(court: Court): Promise<Court> {
        const newCourt = await CourtModel.create({
            id: court.id,
            name: court.name,
            description: court.description,
            image: court.image,
            capacity: court.capacity,
            pricePerHour: court.pricePerHour,
            isAvailable: court.isAvailable,
            sportId: court.sport.id,
            userId: court.user.id
        });

        const created = await CourtModel.findByPk(newCourt.id, {
            include: [SportModel, UserModel]
        });

        if (!created) throw new Error('Error creating court');
        return this.toEntity(created);
    }

    /**
     * Update an existing court by its ID.
     * Performs a partial update and returns the fully reconstructed entity.
     */
    async update(id: string, court: Court): Promise<Court> {
        await CourtModel.update({
            name: court.name,
            description: court.description,
            image: court.image,
            capacity: court.capacity,
            pricePerHour: court.pricePerHour,
            isAvailable: court.isAvailable,
            sportId: court.sport.id,
            userId: court.user.id
        }, {
            where: { id }
        });

        const updated = await CourtModel.findByPk(id, {
            include: [SportModel, UserModel]
        });

        if (!updated) throw new Error('Court not found');
        return this.toEntity(updated);
    }

    //Delete a court from the database by its ID.
    async delete(id: string): Promise<boolean> {
        const deletedCount = await CourtModel.destroy({
            where: { id }
        });
        return deletedCount > 0;
    }

    /**
     * Retrieve all courts owned by a specific user.
     * Includes Sport and User associations.
     */
    async getByUserId(userId: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: { userId },
            include: [SportModel, UserModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    /**
     * Retrieve all courts associated with a specific sport.
     * Includes Sport and User associations.
     */
    async getBySport(sportId: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: { sportId },
            include: [SportModel, UserModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    /**
     * Find a court by its Name.
     * Includes Sport and User associations.
     */
    async getByName(name: string): Promise<Court | null> {
        const court = await CourtModel.findOne({
            where: { name },
            include: [SportModel, UserModel]
        });
        if (!court) return null;
        return this.toEntity(court);
    }

    /**
     * Find a court by its unique ID.
     * Includes Sport and User associations.
     */
    async getById(id: string): Promise<Court | null> {
        const court = await CourtModel.findByPk(id, {
            include: [SportModel, UserModel]
        });
        if (!court) return null;
        return this.toEntity(court);
    }

    /**
     * Retrieve all courts in the database.
     * Includes Sport and User associations for each court.
     */
    async getAll(): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            include: [SportModel, UserModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    //Map a CourtModel (Sequelize) to a Court domain entity.
    private toEntity(model: CourtModel): Court {
        return new Court(
            model.id,
            model.name,
            model.description,
            model.image,
            model.capacity,
            model.pricePerHour,
            model.isAvailable,
            this.sportToEntity(model.sport),
            this.userToEntity(model.user)
        );
    }

    //Map a SportModel to a Sport domain entity.
    private sportToEntity(model: SportModel): Sport {
        return new Sport(
            model.id,
            model.name,
            model.iconUrl,
            model.minPlayers,
            model.maxPlayers
        );
    }

    //Map a UserModel to a User domain entity.
    private userToEntity(model: UserModel): User {
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
}