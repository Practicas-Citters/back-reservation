import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { UuidIdGenerator } from "../../../infrastructure/services/uuid-id.generator.js";

/**
 * Use Case to create a new court.
 */
export class CreateCourtUseCase {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly idGenerator: UuidIdGenerator
    ) { }

    /**
     * Executes the creation of a court.
     * Generates a new unique ID and persists the court.
     * @param dto - Data Transfer Object with court details (excluding ID).
     * @returns The created Court entity.
     */
    async execute(dto: Omit<Court, 'id'>): Promise<Court> {
        const id = this.idGenerator.generate();
        const court = { ...dto, id };

        const newCourt = new Court(
            id,
            dto.name,
            dto.description,
            dto.image,
            dto.capacity,
            dto.pricePerHour,
            dto.isAvailable,
            dto.sport,
            dto.user
        );
        return this.courtRepository.create(newCourt);
    }
}
