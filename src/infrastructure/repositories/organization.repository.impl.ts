import { Op, Sequelize } from 'sequelize';

import { Organization } from '../../domain/entities/organization.entity.js';
import { User } from '../../domain/entities/user.entity.js';
import type { OrganizationRepository } from '../../domain/repositories/organization.domain.repository.js';
import { OrganizationModel } from '../models/organization.model.js';
import { UserModel } from '../models/user.model.js';

export class OrganizationRepositoryImpl implements OrganizationRepository {
    /**
     * Create a new organization and persist it to the database.
     * Re-fetches the organization from the database after creation.
     */
    async create(organization: Organization): Promise<Organization> {
        const newOrg = await OrganizationModel.create({
            id: organization.id,
            name: organization.name,
            description: organization.description,
            email: organization.email,
            phone: organization.phone,
            address: organization.address,
            city: organization.city,
            zipCode: organization.zipCode,
            logo: organization.logo,
            bannerImage: organization.bannerImage,
            isActive: organization.isActive,
            managers: organization.managers.map(m => m.id) // Guardar solo los IDs
        });

        const created = await this.getById(newOrg.id);
        if (!created) throw new Error('Error creating organization');
        return created;
    }

    /**
     * Update an existing organization by its ID.
     * Performs a partial update and returns the fully reconstructed entity.
     */
    async update(id: string, organization: Partial<Organization>): Promise<Organization> {
        const updateData: any = {};

        if (organization.name !== undefined) updateData.name = organization.name;
        if (organization.description !== undefined) updateData.description = organization.description;
        if (organization.email !== undefined) updateData.email = organization.email;
        if (organization.phone !== undefined) updateData.phone = organization.phone;
        if (organization.address !== undefined) updateData.address = organization.address;
        if (organization.city !== undefined) updateData.city = organization.city;
        if (organization.zipCode !== undefined) updateData.zipCode = organization.zipCode;
        if (organization.logo !== undefined) updateData.logo = organization.logo;
        if (organization.bannerImage !== undefined) updateData.bannerImage = organization.bannerImage;
        if (organization.isActive !== undefined) updateData.isActive = organization.isActive;
        if (organization.managers !== undefined) updateData.managers = organization.managers.map(m => m.id);

        const [affectedCount] = await OrganizationModel.update(updateData, { where: { id } });

        if (affectedCount === 0) {
            throw new Error('Organization not found');
        }

        const updated = await this.getById(id);
        if (!updated) throw new Error('Organization not found after update');

        return updated;
    }

    // Delete an organization from the database by its ID.
    async delete(id: string): Promise<boolean> {
        const deletedCount = await OrganizationModel.destroy({ where: { id } });
        return deletedCount > 0;
    }

    // Find an organization by its unique ID.
    async getById(id: string): Promise<Organization | null> {
        const model = await OrganizationModel.findByPk(id);
        if (!model) return null;
        return await this.toEntity(model);
    }

    // Retrieve all organizations from the database.
    async getAll(): Promise<Organization[]> {
        const models = await OrganizationModel.findAll();
        // Usamos Promise.all porque toEntity es async
        return Promise.all(models.map(m => this.toEntity(m)));
    }

    // Find an organization by its name.
    async getByName(name: string): Promise<Organization | null> {
        const model = await OrganizationModel.findOne({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('name')),
                name.toLowerCase()
            ) 
        });
        if (!model) return null;
        return await this.toEntity(model);
    }

    // Find an organization by its email.
    async getByEmail(email: string): Promise<Organization | null> {
        const model = await OrganizationModel.findOne({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('email')),
                email.toLowerCase()
            ) 
        });
        if (!model) return null;
        return await this.toEntity(model);
    }

    // Find an organization by its address.
    async getByAddress(address: string): Promise<Organization | null> {
        const model = await OrganizationModel.findOne({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('address')),
                address.toLowerCase()
            ) 
        });
        if (!model) return null;
        return await this.toEntity(model);
    }

    // Find organizations by its city.
    async getByCity(city: string): Promise<Organization[]> {
        const models = await OrganizationModel.findAll({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('city')),
                city.toLowerCase()
            ) 
        });
        return Promise.all(models.map(m => this.toEntity(m)));
    }

    // Map an OrganizationModel (Sequelize) to an Organization domain entity.
    private async toEntity(model: OrganizationModel): Promise<Organization> {
        if (!model) throw new Error('Organization model is null');

        // Como los managers son un array de UUIDs, buscamos los usuarios manualmente
        let managers: User[] = [];
        if (model.managers && model.managers.length > 0) {
            const userModels = await UserModel.findAll({
                where: {
                    id: { [Op.in]: model.managers }
                }
            });
            managers = userModels.map(um => this.userToEntity(um));
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
            managers
        );
    }

    // Map a UserModel to a User domain entity (reutilizado del booking.repository).
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
            model.points,
            []
        );
    }
}
