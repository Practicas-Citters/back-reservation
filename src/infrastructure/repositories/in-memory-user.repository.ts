import type { UserRepository } from '../../domain/repositories/user.domain.repository.js';
import { User, UserRole } from '../../domain/entities/user.entity.js'; // Assuming UserRole is needed for reconstruction if simpler storage is used, but here we store objects.

export class InMemoryUserRepository implements UserRepository {

    private users: User[] = [];

    //Create a new user
    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    //Find user by email
    async getByEmail(email: string): Promise<User | null> {
        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        return user || null;
    }

    //Find user by id
    async getById(id: string): Promise<User | null> {
        const user = this.users.find(u => u.id === id);
        return user || null;
    }

    //Find all users
    async getAll(): Promise<User[]> {
        const allUsers = this.users;
        return allUsers;
    }

    //Find user by role
    async getByRole(role: UserRole): Promise<User[] | null> {
        const user = this.users.filter(u => u.role === role);
        return user || null;
    }

    //Find user by username
    async getByUsername(username: string): Promise<User | null> {
        const user = this.users.find(u => u.username.toLowerCase() === username.toLowerCase());
        return user || null;
    }

    //Find user by premium status
    async getByPremiumStatus(isPremium: boolean): Promise<User[] | null> {
        const user = this.users.filter(u => u.isPremium === isPremium);
        return user || null;
    }

    //Update an existing user
    async update(user: User): Promise<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            return user;
        }
        throw new Error('User not found');
    }

    //Delete an existing user
    async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}
