import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

/**
 * Use Case to retrieve courts associated with a specific user (owner).
 */
export class GetCourtByUserUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the retrieval of courts by user ID.
     * @param userId - The ID of the user.
     * @returns A list of courts owned by the specified user.
     */
    async execute(userId: string): Promise<Court[]> {
        return this.courtRepository.getByUserId(userId);
    }
}