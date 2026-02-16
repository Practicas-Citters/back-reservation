import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

export class GetCourtByUserUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    async execute(userId: string): Promise<Court[]> {
        return this.courtRepository.getByUserId(userId);
    }
}