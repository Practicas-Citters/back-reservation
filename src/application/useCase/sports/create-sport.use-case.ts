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
    // @QUESTION: The AI removed the id from here, because it was giving me an error in the controllers
}

export class CreateSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

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