import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

export class GetByUsernameUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(username: string): Promise<User | null> {
        const user = await this.userRepository.getByUsername(username);
        if (!user) {
            throw new Error(`User with username ${username} not found`);
        }
        return user;
    }
}