import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Definimos un puerto para generar IDs (Hexagonal: puerto de salida)
export interface IdGenerator {
    generate(): string;
}

// Definimos un puerto para el servicio de encriptación (Hexagonal: puerto de salida)
export interface CreateSportDto {
    name: string;
    iconUrl: string;
    minPlayers: number;
    maxPlayers: number;
    // @QUESTION: La IA me ha quitado el id de aqui, porque me daba un fallo en los controladores
}

export class CreateSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    // @QUESTION: La IA me ha sugerido que ponga async a este metodo, pero no se porque
    execute(dto: CreateSportDto): Promise<Sport> {
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