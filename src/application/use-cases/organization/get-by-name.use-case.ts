import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

/**
 * Use Case to get an organization by its name.
 */
export class GetOrganizationByNameUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the get organization by name use case.
     * @param name - The name of the organization to retrieve.
     * @returns The Organization entity if found, otherwise null.
     */
    async execute(name: string): Promise<Organization | null> {
        return this.organizationRepository.getByName(name);
    }
}