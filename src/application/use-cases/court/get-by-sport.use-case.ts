import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

/**
 * Use Case to retrieve courts associated with a specific sport.
 */
export class GetCourtBySportUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the retrieval of courts by sport ID.
     * @param sportId - The ID of the sport.
     * @returns A list of courts capable of hosting the specified sport.
     */
    async execute(sportId: string): Promise<Court[] | null> {
        return this.courtRepository.getBySport(sportId);
    }
}