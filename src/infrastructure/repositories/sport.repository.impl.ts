import type { SportRepository } from '../../domain/repositories/sport.domain.repository.js';
import { Sport } from '../../domain/entities/sport.entity.js';
import { SportModel } from '../models/sport.model.js';
import { Sequelize } from 'sequelize';


export class SportRepositoryImpl implements SportRepository {
    /**
     * Create a new sport and persist it to the database.
     */
    async create(sport: Sport): Promise<Sport> {
        const newSport = await SportModel.create({
            id: sport.id,
            name: sport.name,
            iconUrl: sport.iconUrl,
            minPlayers: sport.minPlayers,
            maxPlayers: sport.maxPlayers
        });
        return this.toEntity(newSport);
    }

    /**
     * Update an existing sport.
     * Uses 'returning: true' to get the updated model in a single operation.
     */
    async update(sport: Sport): Promise<Sport> {
        const [affectedCount, [updatedSport]] = await SportModel.update({
            name: sport.name,
            iconUrl: sport.iconUrl,
            minPlayers: sport.minPlayers,
            maxPlayers: sport.maxPlayers
        }, {
            where: { id: sport.id },
            returning: true
        });

        if (affectedCount === 0 || !updatedSport) {
            throw new Error('Sport not found');
        }

        return this.toEntity(updatedSport);
    }

    /**
     * Delete a sport from the database by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedCount = await SportModel.destroy({
            where: { id }
        });
        return deletedCount > 0;
    }

    /**
     * Find a sport by its Name.
     */
    async getByName(name: string): Promise<Sport | null> {
        const sport = await SportModel.findOne({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('name')),
                name.toLowerCase()
            ) 
        });
        if (!sport) return null;
        return this.toEntity(sport);
    }

    /**
     * Find a sport by its unique ID.
     */
    async getById(id: string): Promise<Sport | null> {
        const sport = await SportModel.findByPk(id);
        if (!sport) return null;
        return this.toEntity(sport);
    }

    /**
     * Retrieve all sports from the database.
     */
    async getAll(): Promise<Sport[]> {
        const sports = await SportModel.findAll();
        return sports.map(s => this.toEntity(s));
    }

    /**
     * Map a SportModel (Sequelize) to a Sport domain entity.
     */
    private toEntity(model: SportModel): Sport {
        return new Sport(
            model.id,
            model.name,
            model.iconUrl,
            model.minPlayers,
            model.maxPlayers
        );
    }
}