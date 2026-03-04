import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface UpdateSportDto {
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
     * @param dto - The data to update.
     * @returns The updated Sport entity.
     * @throws Error if the sport is not found.
     */
    async execute(id: string, dto: UpdateSportDto): Promise<Sport> {
        const sport = await this.sportRepository.getById(id);
        if (!sport) {
            throw new Error(`Sport with id ${id} not found`);
        }

        // Update fields if they are present in the DTO
        if (dto.name !== undefined) sport.name = dto.name;
        if (dto.iconUrl !== undefined) sport.iconUrl = dto.iconUrl;
        if (dto.minPlayers !== undefined) sport.minPlayers = dto.minPlayers;
        if (dto.maxPlayers !== undefined) sport.maxPlayers = dto.maxPlayers;

        return this.sportRepository.update(sport);
    }
}