import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";

// Define a port for the encryption service (Hexagonal: output port)
export interface DeleteSportDto {
    id: string;
}

/**
 * Use Case to delete a sport.
 */
export class DeleteSportUseCase {
    constructor(
        private readonly sportRepository: SportRepository,
    ) { }

    /**
     * Executes the deletion of a sport.
     * @param dto - DTO containing the ID of the sport to delete.
     * @returns True if deletion was successful, false otherwise.
     */
    async execute(dto: DeleteSportDto): Promise<boolean> {
        return this.sportRepository.delete(dto.id);
    }
}