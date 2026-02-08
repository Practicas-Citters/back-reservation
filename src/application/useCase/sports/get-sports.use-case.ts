import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

export interface GetSportsDto {

}

// Definimos un puerto para generar IDs (Hexagonal: puerto de salida)
export interface IdGenerator {
    generate(): string;
}

export class GetSportsUseCase {
    constructor(
        // @QUESTION: La IA me ha sugerido que ponga private readonly, pero no se porque
        private readonly sportRepository: SportRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    execute(): Promise<Sport[]> {
        return this.sportRepository.findAll();
    }
}