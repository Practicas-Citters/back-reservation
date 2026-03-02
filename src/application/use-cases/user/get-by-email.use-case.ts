import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

export class GetByEmailUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        return user;
    }
}