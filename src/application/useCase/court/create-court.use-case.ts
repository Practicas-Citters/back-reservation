import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { UuidIdGenerator } from "../../../infrastructure/services/uuid-id.generator.js";

export class CreateCourtUseCase {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly idGenerator: UuidIdGenerator
    ) { }

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
