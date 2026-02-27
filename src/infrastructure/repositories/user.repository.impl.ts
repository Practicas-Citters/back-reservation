import type { UserRepository } from '../../domain/repositories/user.domain.repository.js';
import { User, UserRole } from '../../domain/entities/user.entity.js';
import { UserModel } from '../models/user.model.js';

export class UserRepositoryImpl implements UserRepository {
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

    async getByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) return null;
        return this.toEntity(user);
    }

    async getById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        return this.toEntity(user);
    }

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

    private toEntity(model: UserModel): User {
        return new User(
            model.id,
            model.fullName,
            model.username,
            model.email,
            model.password,
            model.phone ?? '', // Handle potential null if Entity expects string (though we updated entity to allow null, let's check)
            model.birthDate,
            model.role,
            model.profilePicture ?? '',
            model.isPremium,
            model.points
        );
    }
}
