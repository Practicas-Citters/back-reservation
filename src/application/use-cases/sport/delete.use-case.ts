import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface DeleteSportInput {
    id: string;
}

/**
 * Use Case to delete a sport.
 */
export class DeleteSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

    /**
     * Executes the deletion of a sport.
     * @param input - INPUT containing the ID of the sport to delete.
     * @returns True if deletion was successful, false otherwise.
     */
    async execute(input: DeleteSportInput): Promise<boolean> {
        const sport = await this.sportRepository.getById(input.id);
        if (!sport) {
            throw new Error(`Sport with ID ${input.id} not found`);
        }
        return this.sportRepository.delete(input.id);
    }
}