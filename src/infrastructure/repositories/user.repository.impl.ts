import type { UserRepository } from '../../domain/repositories/user.domain.repository.js';
import { User, UserRole } from '../../domain/entities/user.entity.js';
import { UserModel } from '../models/user.model.js';
import { Sequelize } from 'sequelize';


export class UserRepositoryImpl implements UserRepository {
    /**
     * Create a new user and persist it to the database.
     */
    async create(user: User): Promise<User> {

        const newUser = await UserModel.create({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            birthDate: user.birthDate,
            role: user.role,
            profilePicture: user.profilePicture,
            isPremium: user.isPremium,
            points: user.points
        });

        return this.toEntity(newUser);
    }

    /**
     * Find a user by their unique Email address.
     */
    async getByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('email')),
                email.toLowerCase()
            ) 
        });
        if (!user) return null;
        return this.toEntity(user);
    }

    /**
     * Find a user by their unique ID.
     */
    async getById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        return this.toEntity(user);
    }

    /**
     * Retrieve all users from the database.
     */
    async getAll(): Promise<User[]> {
        const user = await UserModel.findAll();
        return user.map(u => this.toEntity(u));
    }

    /**
     * Retrieve all users with a specific Role.
     */
    async getByRole(role: UserRole): Promise<User[] | null> {
        const user = await UserModel.findAll({ where: { role } });
        if (!user) return null;
        return user.map(u => this.toEntity(u));
    }

    /**
     * Find a user by their Username.
     */
    async getByUsername(username: string): Promise<User | null> {
        const user = await UserModel.findOne({ 
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('username')),
                username.toLowerCase()
            ) 
        });
        if (!user) return null;
        return this.toEntity(user);
    }

    /**
     * Retrieve users based on their premium status.
     */
    async getByPremiumStatus(isPremium: boolean): Promise<User[] | null> {
        const user = await UserModel.findAll({ where: { isPremium } });
        if (!user) return null;
        return user.map(u => this.toEntity(u));
    }

    /**
     * Update an existing user in the database.
     * Returns the fully updated domain entity.
     */
    async update(user: User): Promise<User> {
        const [affectedCount, [updatedUser]] = await UserModel.update({
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            birthDate: user.birthDate,
            role: user.role,
            profilePicture: user.profilePicture,
            isPremium: user.isPremium,
            points: user.points
        }, {
            where: { id: user.id },
            returning: true
        });

        if (affectedCount === 0 || !updatedUser) {
            throw new Error('User not found');
        }

        return this.toEntity(updatedUser);
    }

    /**
     * Delete a user from the database by their ID.
     */
    async delete(id: string): Promise<boolean> {
        const deletedUser = await UserModel.destroy({ where: { id } });
        return deletedUser > 0;
    }

    /**
     * Map a UserModel (Sequelize) to a User domain entity.
     * Handles null values for optional fields by providing sensible defaults.
     */
    private toEntity(model: UserModel): User {
        return new User(
            model.id,
            model.fullName,
            model.username,
            model.email,
            model.password,
            model.phone ?? '', // Handle potential null if Entity expects string
            model.birthDate,
            model.role,
            model.profilePicture ?? '',
            model.isPremium,
            model.points
        );
    }
}