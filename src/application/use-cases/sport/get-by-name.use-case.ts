import { Sport } from "../../../domain/entities/sport.entity.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

export interface GetSportByNameInput {
    name: string;
}

/**
 * Use Case to retrieve a sport by its name.
 * It orchestrates the retrieval of a sport from the repository.
 */
export class GetSportByNameUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

    /**
     * Executes the use case to get an sport by its name.
     * @returns A promise that resolves to an array of Sport entities.
     */
    execute(input: GetSportByNameInput): Promise<Sport | null> {
        return this.sportRepository.getByName(input.name);
    }
}