import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export class UpdateCourtUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(id: string, court: Court): Promise<Court | null> {
        return this.courtRepository.update(id, court);
    }
}