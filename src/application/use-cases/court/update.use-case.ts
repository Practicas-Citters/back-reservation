import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export interface UpdateCourtInput {
    name?: string;
    description?: string;
    image?: string;
    capacity?: number;
    pricePerHour?: number;
    isAvailable?: boolean;
    sportId?: string;
    organizationId?: string;
}

import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";
import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";

/**
 * Use Case to update an existing court.
 * Updates only the fields provided in the INPUT.
 */
export class UpdateCourtUseCase {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly sportRepository: SportRepository,
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    /**
     * Executes the update process.
     * 1. Fetches the court by ID to ensure it exists.
     * 2. Modifies only the fields that are present in the INPUT.
     * 3. Persists the changes.
     * 
     * @param id - The ID of the court to update.
     * @param input - Data Transfer Object containing partial updates.
     * @returns The updated Court entity.
     */
    async execute(id: string, input: UpdateCourtInput): Promise<Court> {
        const court = await this.courtRepository.getById(id);
        if (!court) {
            throw new Error(`Court with id ${id} not found`);
        }

        // We use strict check ( !== undefined ) to allow updates to falsy values
        // like 0 (price) or false (isAvailable).
        if (input.name !== undefined) court.name = input.name;
        if (input.description !== undefined) court.description = input.description;
        if (input.image !== undefined) court.image = input.image;
        if (input.capacity !== undefined) court.capacity = input.capacity;
        if (input.pricePerHour !== undefined) court.pricePerHour = input.pricePerHour;
        if (input.isAvailable !== undefined) court.isAvailable = input.isAvailable;

        if (input.sportId !== undefined) {
            const sport = await this.sportRepository.getById(input.sportId);
            if (!sport) {
                throw new Error(`Sport with id ${input.sportId} not found`);
            }
            court.sport = sport;
        }

        if (input.organizationId !== undefined) {
            const organization = await this.organizationRepository.getById(input.organizationId);
            if (!organization) {
                throw new Error(`Organization with id ${input.organizationId} not found`);
            }
            court.organization = organization;
        }

        return this.courtRepository.update(id, court);
    }
}

