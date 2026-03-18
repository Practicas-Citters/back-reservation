import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

/**
 * Use Case to get an organization by its ID.
 */
export class GetOrganizationByIdUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the get organization by ID use case.
     * @param id - The ID of the organization to retrieve.
     * @returns The Organization entity if found, otherwise null.
     */
    async execute(id: string): Promise<Organization | null> {
        return this.organizationRepository.getById(id);
    }
}