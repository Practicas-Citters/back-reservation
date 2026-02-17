import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export class DeleteCourtUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(id: string): Promise<boolean> {
        return this.courtRepository.delete(id);
    }
}