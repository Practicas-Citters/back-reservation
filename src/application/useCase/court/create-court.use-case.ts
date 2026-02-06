import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.repository.js";
import { UuidIdGenerator } from "../../../infrastructure/services/uuid-id.generator.js";

export class CreateCourtUseCase {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly idGenerator: UuidIdGenerator
    ) { }

    async execute(payload: Omit<Court, 'id'>): Promise<Court> {
        const id = this.idGenerator.generate();
        const court = { ...payload, id };
        // Note: Direct casting or better entity construction might be needed depending on strictness
        // Assuming the repository handles the object correctly or we instantiate the class
        // Let's instantiate the class for correctness if the entity is a class
        const newCourt = new Court(
            id,
            payload.name,
            payload.description,
            payload.image,
            payload.capacity,
            payload.pricePerHour,
            payload.isAvailable,
            payload.sport,
            payload.user
        );
        return this.courtRepository.create(newCourt);
    }
}
