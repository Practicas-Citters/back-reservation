import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

export class GetByIdUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
}