import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { User } from "../../../domain/entities/user.entity.js";

export class GetByPremiumStatusUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(isPremium: boolean): Promise<User[]> {
        const users = await this.userRepository.getByPremiumStatus(isPremium);
        return users || [];
    }
}
