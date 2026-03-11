import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";

// Define a port to generate IDs (Hexagonal: output port)
export interface IdGenerator {
    generate(): string;
}

// Use Case to create a new court.
export class CreateCourtUseCase {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    /**
     * Executes the creation of a court.
     * Generates a new unique ID and persists the court.
     * @param input - Data Transfer Object with court details (excluding ID).
     * @returns The created Court entity.
     */
    async execute(input: Omit<Court, 'id'>): Promise<Court> {
        const newCourt = new Court(
            this.idGenerator.generate(),
            input.name,
            input.description,
            input.image,
            input.capacity,
            input.pricePerHour,
            input.isAvailable,
            input.sport,
            input.user
        );
        return this.courtRepository.create(newCourt);
    }
}
