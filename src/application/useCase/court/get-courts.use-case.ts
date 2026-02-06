import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.repository.js";

export class GetCourtsUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(): Promise<Court[]> {
        return this.courtRepository.findAll();
    }
}
