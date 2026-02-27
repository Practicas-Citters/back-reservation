import type { CourtRepository } from '../../domain/repositories/court.domain.repository.js';
import { Court } from '../../domain/entities/court.entity.js';
import { CourtModel } from '../models/court.model.js';
import { SportModel } from '../models/sport.model.js';
import { UserModel } from '../models/user.model.js';
import { Sport } from '../../domain/entities/sport.entity.js';
import { User, UserRole } from '../../domain/entities/user.entity.js';

export class CourtRepositoryImpl implements CourtRepository {

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

        // We fetch it again to get the included associations (sport and user)
        const fetchCreated = await CourtModel.findByPk(newCourt.id, {
            include: [SportModel, UserModel]
        });

        if (!fetchCreated) {
            throw new Error('Error creating Court');
        }

        return this.toEntity(fetchCreated);
    }

    async getAll(): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            include: [SportModel, UserModel]
        });
        return courts.map(court => this.toEntity(court));
    }

    async getByName(name: string): Promise<Court | null> {
        const court = await CourtModel.findOne({
            where: { name },
            include: [SportModel, UserModel]
        });
        if (!court) return null;
        return this.toEntity(court);
    }

    async getByUserId(userId: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: { userId },
            include: [SportModel, UserModel]
        });
        return courts.map(court => this.toEntity(court));
    }

    async getBySport(sportId: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: { sportId },
            include: [SportModel, UserModel]
        });
        return courts.map(court => this.toEntity(court));
    }

    async getById(id: string): Promise<Court | null> {
        const court = await CourtModel.findByPk(id, {
            include: [SportModel, UserModel]
        });
        if (!court) return null;
        return this.toEntity(court);
    }

    async update(id: string, court: Court): Promise<Court> {
        const [affectedCount] = await CourtModel.update({
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

        if (affectedCount === 0) {
            throw new Error('Court not found');
        }

        const updatedCourt = await CourtModel.findByPk(id, {
            include: [SportModel, UserModel]
        });

        if (!updatedCourt) {
            throw new Error('Error fetching updated Court');
        }

        return this.toEntity(updatedCourt);
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await CourtModel.destroy({
            where: { id }
        });
        return deletedCount > 0;
    }

    private toEntity(model: CourtModel): Court {
        const sportEntity = new Sport(
            model.sport?.id || '',
            model.sport?.name || '',
            model.sport?.courtType || '',
            model.sport?.minPlayers || 0,
            model.sport?.maxPlayers || 0,
            model.sport?.duration || 0
        );

        const userEntity = new User(
            model.user?.id || '',
            model.user?.fullName || '',
            model.user?.username || '',
            model.user?.email || '',
            model.user?.password || '',
            model.user?.phone || '',
            model.user?.birthDate || new Date(),
            model.user?.role || UserRole.USUARIO,
            model.user?.profilePicture || '',
            model.user?.isPremium || false,
            model.user?.points || 0
        );

        return new Court(
            model.id,
            model.name,
            model.description,
            model.image,
            model.capacity,
            model.pricePerHour,
            model.isAvailable,
            sportEntity,
            userEntity
        );
    }
}