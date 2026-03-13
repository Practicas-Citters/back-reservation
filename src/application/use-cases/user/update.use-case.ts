import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User, UserRole } from "../../../domain/entities/user.entity.js";
import type { PasswordHasher } from "./create.use-case.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface UpdateUserInput {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthDate?: string;
    role?: string;
    isPremium?: boolean;
    profilePicture?: string;
    points?: number;
}

export class UpdateUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ) { };

    /**
     * Executes the update of a sport.
     * @param id - The ID of the sport to update.
     * @param input - The data to update.
     * @returns The updated Sport entity.
     * @throws Error if the sport is not found.
     */

    async execute(id: string, input: UpdateUserInput): Promise<User> {
        // 1. Fetch the existing user from the repository
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        // 2. Track if any property has actually changed to avoid unnecessary updates
        let hasChanged = false;

        // 3. Update fields only if they are provided and are different from the current values
        if (input.fullName !== undefined && input.fullName !== user.fullName) {
            user.fullName = input.fullName;
            hasChanged = true;
        }
        if (input.username !== undefined && input.username !== user.username) {
            user.username = input.username;
            hasChanged = true;
        }
        if (input.email !== undefined && input.email !== user.email) {
            user.email = input.email;
            hasChanged = true;
        }
        
        // 4. Handle password hashing if a new password is provided
        if (input.password !== undefined) {
            // We hash the password using the injected PasswordHasher service.
            // Since we can't easily compare the plain text input with the existing hash 
            // without re-hashing or using a comparison tool, we assume any provided password 
            // intended to be an update.
            user.password = await this.passwordHasher.hash(input.password);
            hasChanged = true;
        }

        if (input.phone !== undefined && input.phone !== user.phone) {
            user.phone = input.phone;
            hasChanged = true;
        }
        if (input.birthDate !== undefined && input.birthDate !== user.birthDate) {
            user.birthDate = input.birthDate;
            hasChanged = true;
        }

        // 5. Update the UserRole if provided
        if (input.role !== undefined && input.role !== user.role) {
            user.role = input.role as UserRole;
            hasChanged = true;
        }

        if (input.isPremium !== undefined && input.isPremium !== user.isPremium) {
            user.isPremium = input.isPremium;
            hasChanged = true;
        }
        if (input.profilePicture !== undefined && input.profilePicture !== user.profilePicture) {
            user.profilePicture = input.profilePicture;
            hasChanged = true;
        }
        if (input.points !== undefined && input.points !== user.points) {
            user.points = input.points;
            hasChanged = true;
        }

        // 6. Only perform the repository update if something actually changed
        if (!hasChanged) {
            console.log(`No changes detected for user ${id}, skipping database update.`);
            return user;
        }

        return this.userRepository.update(user);
    }

}
