import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface UpdateSportInput {
    name?: string;
    iconUrl?: string;
    minPlayers?: number;
    maxPlayers?: number;
}

/**
 * Use Case to update an existing sport.
 */
export class UpdateSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

    /**
     * Executes the update of a sport.
     * @param id - The ID of the sport to update.
     * @param input - The data to update.
     * @returns The updated Sport entity.
     * @throws Error if the sport is not found.
     */
    async execute(id: string, input: UpdateSportInput): Promise<Sport> {
        const sport = await this.sportRepository.getById(id);
        if (!sport) {
            throw new Error(`Sport with id ${id} not found`);
        }

        // Update fields if they are present in the INPUT
        if (input.name !== undefined) sport.name = input.name;
        if (input.iconUrl !== undefined) sport.iconUrl = input.iconUrl;
        if (input.minPlayers !== undefined) sport.minPlayers = input.minPlayers;
        if (input.maxPlayers !== undefined) sport.maxPlayers = input.maxPlayers;

        return this.sportRepository.update(sport);
    }
}