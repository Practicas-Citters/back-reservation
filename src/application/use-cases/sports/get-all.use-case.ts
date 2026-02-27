import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

/**
 * Use Case to retrieve all sports.
 * It orchestrates the retrieval of sports from the repository.
 */
export class GetSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

    /**
     * Executes the use case to get all sports.
     * @returns A promise that resolves to an array of Sport entities.
     */
    execute(): Promise<Sport[]> {
        return this.sportRepository.getAll();
    }
}