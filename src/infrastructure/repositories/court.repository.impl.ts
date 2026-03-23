import type { CourtRepository } from '../../domain/repositories/court.domain.repository.js';
import { Court } from '../../domain/entities/court.entity.js';
import { CourtModel } from '../models/court.model.js';
import { SportModel } from '../models/sport.model.js';
import { OrganizationModel } from '../models/organization.model.js';
import { Sequelize } from 'sequelize';

import { Sport } from '../../domain/entities/sport.entity.js';
import { Organization } from '../../domain/entities/organization.entity.js';

export class CourtRepositoryImpl implements CourtRepository {
    /**
     * Create a new court and persist it to the database.
     * Re-fetches the court with full associations (Sport and Organization).
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
            organizationId: court.organization.id
        });

        const created = await CourtModel.findByPk(newCourt.id, {
            include: [SportModel, OrganizationModel]
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
            organizationId: court.organization.id
        }, {
            where: { id }
        });

        const updated = await CourtModel.findByPk(id, {
            include: [SportModel, OrganizationModel]
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
     * Retrieve all courts owned by a specific organization.
     * Includes Sport and Organization associations.
     */
    async getByOrganizationId(organizationId: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: { organizationId },
            include: [SportModel, OrganizationModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    /**
     * Retrieve all courts associated with a specific sport.
     * Includes Sport and Organization associations.
     */
    async getBySport(sportId: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: { sportId },
            include: [SportModel, OrganizationModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    /**
     * Find a court by its Name.
     * Includes Sport and Organization associations.
     */
    async getByName(name: string): Promise<Court | null> {
        const court = await CourtModel.findOne({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('name')),
                name.toLowerCase()
            ),
            include: [SportModel, OrganizationModel]
        });
        if (!court) return null;
        return this.toEntity(court);
    }

    /**
     * Find a court by its unique ID.
     * Includes Sport and Organization associations.
     */
    async getById(id: string): Promise<Court | null> {
        const court = await CourtModel.findByPk(id, {
            include: [SportModel, OrganizationModel]
        });
        if (!court) return null;
        return this.toEntity(court);
    }

    /**
     * Find a court by its location.
     * Includes Sport and Organization associations.
     */
    async getByLocation(location: string): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('location')),
                location.toLowerCase()
            ),
            include: [SportModel, OrganizationModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    /**
     * Retrieve all courts in the database.
     * Includes Sport and Organization associations for each court.
     */
    async getAll(): Promise<Court[]> {
        const courts = await CourtModel.findAll({
            include: [SportModel, OrganizationModel]
        });
        return courts.map(c => this.toEntity(c));
    }

    //Map a CourtModel (Sequelize) to a Court domain entity.
    private toEntity(model: CourtModel): Court {
        if (!model) throw new Error('Court model is null');

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
            this.organizationToEntity(model.organization)
        );
    }

    //Map a SportModel to a Sport domain entity.
    private sportToEntity(model: SportModel): Sport {
        if (!model) {
            throw new Error('Associated Sport model is null. Ensure Sport association is included in the query.');
        }
        return new Sport(
            model.id,
            model.name,
            model.iconUrl,
            model.minPlayers,
            model.maxPlayers
        );
    }

    //Map an OrganizationModel to an Organization domain entity.
    private organizationToEntity(model: OrganizationModel): Organization {
        if (!model) {
            throw new Error('Associated Organization model is null. Ensure Organization association is included in the query.');
        }
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
            [] // Mapping managers as empty for now or we could fetch them if needed
        );
    }
}