import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

/**
 * Use Case to retrieve a court by its location.
 */

export class GetCourtByLocationUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }
    /**
     * Executes the retrieval of a court by location.
     * @param location - The location of the court.
     * @returns The Court array if found, otherwise an empty array.
     */
    async execute(location: string): Promise<Court[]> {
        return this.courtRepository.getByLocation(location);
    }
}