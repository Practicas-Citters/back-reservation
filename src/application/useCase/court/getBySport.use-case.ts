import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export class GetCourtBySportUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(sportId: string): Promise<Court[] | null> {
        return this.courtRepository.getBySport(sportId);
    }
}