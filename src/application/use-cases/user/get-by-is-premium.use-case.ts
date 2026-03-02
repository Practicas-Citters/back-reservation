import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

export class GetByIsPremiumUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(isPremium: boolean): Promise<User[]> {
        const users = await this.userRepository.getByIsPremium(isPremium);
        if (!users) {
            throw new Error(`Users with isPremium ${isPremium} not found`);
        }
        return users;
    }
}