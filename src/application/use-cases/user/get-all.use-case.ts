import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

export class GetAllUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return this.userRepository.getAll();
    }
}