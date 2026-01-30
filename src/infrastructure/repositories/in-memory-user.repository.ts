import type { UserRepository } from '../../domain/repositories/user.domain.repository.js';
import { User, UserRole } from '../../domain/entities/user.entity.js'; // Assuming UserRole is needed for reconstruction if simpler storage is used, but here we store objects.

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(u => u.email === email);
        return user || null;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(u => u.id === id);
        return user || null;
    }

    async update(user: User): Promise<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            return user;
        }
        throw new Error('User not found');
    }
}
