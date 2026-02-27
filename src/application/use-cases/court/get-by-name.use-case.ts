import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

/**
 * Use Case to retrieve a court by its name.
 */
export class GetCourtByNameUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the retrieval of a court by name.
     * @param name - The name of the court.
     * @returns The Court entity if found, otherwise null.
     */
    async execute(name: string): Promise<Court | null> {
        return this.courtRepository.getByName(name);
    }
}
