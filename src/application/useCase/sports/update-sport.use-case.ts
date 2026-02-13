import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface UpdateSportDto {
    name: string;
    iconUrl: string;
    minPlayers: number;
    maxPlayers: number;
    // @QUESTION: The AI removed the id from here, because it was giving me an error in the controllers
}

export class UpdateSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

}