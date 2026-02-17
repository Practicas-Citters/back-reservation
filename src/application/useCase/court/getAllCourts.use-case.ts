import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";

export class GetAllCourtsUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(): Promise<Court[]> {
        return this.courtRepository.getAll();
    }
}
