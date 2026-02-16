import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export class GetCourtByNameUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(name: string): Promise<Court | null> {
        return this.courtRepository.getByName(name);
    }
}
