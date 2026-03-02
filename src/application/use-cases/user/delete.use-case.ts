import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";

export class DeleteUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    /**
     * Executes the deletion of a user.
     * @param id - The ID of the user to delete.
     * @returns True if deletion was successful, otherwise false.
     */

    async execute(id: string): Promise<boolean> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return this.userRepository.delete(id);
    }
}