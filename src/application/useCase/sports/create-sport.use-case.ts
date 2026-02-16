import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port to generate IDs (Hexagonal: output port)
export interface IdGenerator {
    generate(): string;
}

// Define a port for the encryption service (Hexagonal: output port)
export interface CreateSportDto {
    name: string;
    iconUrl: string;
    minPlayers: number;
    maxPlayers: number;
}

/**
 * Use Case to create a new sport.
 */
export class CreateSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    /**
     * Executes the creation of a sport.
     * @param dto - Data Transfer Object containing sport details.
     * @returns The created Sport entity.
     */
    async execute(dto: CreateSportDto): Promise<Sport> {
        const newSport = new Sport(
            this.idGenerator.generate(),
            dto.name,
            dto.iconUrl,
            dto.minPlayers,
            dto.maxPlayers
        );
        return this.sportRepository.create(newSport);
    }
}