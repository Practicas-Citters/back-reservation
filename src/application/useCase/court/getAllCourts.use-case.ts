import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";

/**
 * Use Case to retrieve all courts.
 */
export class GetAllCourtsUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the retrieval of all courts.
     * @returns A list of all Court entities.
     */
    async execute(): Promise<Court[]> {
        return this.courtRepository.getAll();
    }
}
