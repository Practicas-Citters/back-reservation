import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

/**
 * Use Case to get all organizations.
 */
export class GetAllOrganizationsUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the get all organizations use case.
     * @returns An array of Organization entities.
     */
    async execute(): Promise<Organization[]> {
        return this.organizationRepository.getAll();
    }
}