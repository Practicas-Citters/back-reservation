import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export class GetCourtByIdUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(id: string): Promise<Court | null> {
        return this.courtRepository.getById(id);
    }
}