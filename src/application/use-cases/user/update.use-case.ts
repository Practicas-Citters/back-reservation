import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User, UserRole } from "../../../domain/entities/user.entity.js";

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
    constructor(private readonly userRepository: UserRepository) { };

    /**
     * Executes the update of a sport.
     * @param id - The ID of the sport to update.
     * @param input - The data to update.
     * @returns The updated Sport entity.
     * @throws Error if the sport is not found.
     */

    async execute(id: string, input: UpdateUserInput): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        if (input.fullName !== undefined) user.fullName = input.fullName;
        if (input.username !== undefined) user.username = input.username;
        if (input.email !== undefined) user.email = input.email;
        if (input.password !== undefined) user.password = input.password;
        if (input.phone !== undefined) user.phone = input.phone;
        if (input.birthDate !== undefined) user.birthDate = input.birthDate;
        if (input.role !== undefined) {
            const isValidRole = Object.values(UserRole).includes(input.role as UserRole);
            if (!isValidRole) {
                throw new Error(`Invalid role. Allowed values: ${Object.values(UserRole).join(', ')}`);
            }
            user.role = input.role as UserRole;
        }
        if (input.isPremium !== undefined) user.isPremium = input.isPremium;
        if (input.profilePicture !== undefined) user.profilePicture = input.profilePicture;
        if (input.points !== undefined) user.points = input.points;

        return this.userRepository.update(user);
    }
}
