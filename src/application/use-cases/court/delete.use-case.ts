import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

// Use Case to delete a court by ID.
export class DeleteCourtUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the deletion of a court.
     * @param id - The ID of the court to delete.
     * @returns True if deletion was successful, otherwise false.
     */
    async execute(id: string): Promise<boolean> {
        return this.courtRepository.delete(id);
    }
}