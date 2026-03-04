
import { User, UserRole } from "../entities/user.entity.js";

export interface UserRepository {
    // CRUD
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<boolean>;

    // Search the user by email / id / name / role / isPremium / all
    getByEmail(email: string): Promise<User | null>;
    getById(id: string): Promise<User | null>;
    getAll(): Promise<User[]>;
    getByRole(role: UserRole): Promise<User[] | null>;
    getByUsername(username: string): Promise<User | null>;
    getByIsPremium(isPremium: boolean): Promise<User[] | null>;
}
