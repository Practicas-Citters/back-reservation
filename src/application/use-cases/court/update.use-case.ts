import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export interface UpdateCourtDto {
    name?: string;
    description?: string;
    image?: string;
    capacity?: number;
    pricePerHour?: number;
    isAvailable?: boolean;
    sportId?: string;
    userId?: string;
}

/**
 * Use Case to update an existing court.
 * Updates only the fields provided in the DTO.
 */
export class UpdateCourtUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the update process.
     * 1. Fetches the court by ID to ensure it exists.
     * 2. Modifies only the fields that are present in the DTO.
     * 3. Persists the changes.
     * 
     * @param id - The ID of the court to update.
     * @param dto - Data Transfer Object containing partial updates.
     * @returns The updated Court entity.
     */
    async execute(id: string, dto: UpdateCourtDto): Promise<Court> {
        const court = await this.courtRepository.getById(id);
        if (!court) {
            throw new Error(`Court with id ${id} not found`);
        }

        // We use strict check ( !== undefined ) to allow updates to falsy values
        // like 0 (price) or false (isAvailable).
        if (dto.name !== undefined) court.name = dto.name;
        if (dto.description !== undefined) court.description = dto.description;
        if (dto.image !== undefined) court.image = dto.image;
        if (dto.capacity !== undefined) court.capacity = dto.capacity;
        if (dto.pricePerHour !== undefined) court.pricePerHour = dto.pricePerHour;
        if (dto.isAvailable !== undefined) court.isAvailable = dto.isAvailable;

        return this.courtRepository.update(id, court);
    }
}
