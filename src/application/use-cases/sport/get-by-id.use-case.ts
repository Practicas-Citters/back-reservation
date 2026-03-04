import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

export interface GetSportByIdInput {
    id: string;
}

/**
 * Use Case to retrieve a sport by its id.
 * It orchestrates the retrieval of a sport from the repository.
 */
export class GetSportByIdUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

    /**
     * Executes the use case to get a sport by its id.
     * @returns A promise that resolves to a Sport entity.
     */
    execute(input: GetSportByIdInput): Promise<Sport | null> {
        return this.sportRepository.getById(input.id);
    }
}