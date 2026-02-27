import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

/**
 * Use Case to retrieve a court by its unique ID.
 */
export class GetCourtByIdUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the retrieval of a court by ID.
     * @param id - The ID of the court.
     * @returns The Court entity if found, otherwise null.
     */
    async execute(id: string): Promise<Court | null> {
        return this.courtRepository.getById(id);
    }
}