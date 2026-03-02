import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User, UserRole } from "../../../domain/entities/user.entity.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface UpdateUserDto {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthDate?: Date;
    role?: string;
    isPremium?: boolean;
    points?: number;
}

export class UpdateUseCase {
    constructor(private readonly userRepository: UserRepository) { };

    /**
     * Executes the update of a sport.
     * @param id - The ID of the sport to update.
     * @param dto - The data to update.
     * @returns The updated Sport entity.
     * @throws Error if the sport is not found.
     */

    async execute(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        if (dto.fullName !== undefined) user.fullName = dto.fullName;
        if (dto.username !== undefined) user.username = dto.username;
        if (dto.email !== undefined) user.email = dto.email;
        if (dto.password !== undefined) user.password = dto.password;
        if (dto.phone !== undefined) user.phone = dto.phone;
        if (dto.birthDate !== undefined) user.birthDate = dto.birthDate;
        if (dto.role !== undefined) {
            const isValidRole = Object.values(UserRole).includes(dto.role as UserRole);
            if (!isValidRole) {
                throw new Error(`Invalid role. Allowed values: ${Object.values(UserRole).join(', ')}`);
            }
            user.role = dto.role as UserRole;
        }
        if (dto.isPremium !== undefined) user.isPremium = dto.isPremium;
        if (dto.points !== undefined) user.points = dto.points;

        return this.userRepository.update(user);
    }
}
