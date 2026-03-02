import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User, UserRole } from "../../../domain/entities/user.entity.js";

export class GetByRoleUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(role: UserRole): Promise<User[]> {
        const users = await this.userRepository.getByRole(role);
        if (!users) {
            throw new Error(`Users with role ${role} not found`);
        }
        return users;
    }
}