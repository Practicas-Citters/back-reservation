
import { User } from "../entities/user.entity.js";

export interface UserRepository {
    // CRUD
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;

    // Search the user by email / id
    getByEmail(email: string): Promise<User | null>;
    getById(id: string): Promise<User | null>;

}
