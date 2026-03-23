import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { Court } from "../../../domain/entities/court.entity.js";

/**
 * Use Case to retrieve courts associated with a specific organization (owner).
 */
export class GetCourtByOrganizationUseCase {
    constructor(private readonly courtRepository: CourtRepository) { }

    /**
     * Executes the retrieval of courts by organization ID.
     * @param organizationId - The ID of the organization.
     * @returns A list of courts owned by the specified organization.
     */
    async execute(organizationId: string): Promise<Court[]> {
        return this.courtRepository.getByOrganizationId(organizationId);
    }
}
