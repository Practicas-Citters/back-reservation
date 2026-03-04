import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port to generate IDs (Hexagonal: output port)
export interface IdGenerator {
    generate(): string;
}

// Use Case to create a new sport.
export class CreateSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    /**
     * Executes the creation of a sport.
     * @param input - Data Transfer Object containing sport details (excluding ID).
     * @returns The created Sport entity.
     */
    async execute(input: Omit<Sport, 'id'>): Promise<Sport> {
        const newSport = new Sport(
            this.idGenerator.generate(),
            input.name,
            input.iconUrl,
            input.minPlayers,
            input.maxPlayers
        );
        return this.sportRepository.create(newSport);
    }
}
