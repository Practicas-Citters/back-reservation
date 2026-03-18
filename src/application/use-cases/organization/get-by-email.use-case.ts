import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

/**
 * Use Case to get an organization by its email.
 */
export class GetOrganizationByEmailUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the get organization by email use case.
     * @param email - The email of the organization to retrieve.
     * @returns The Organization entity if found, otherwise null.
     */
    async execute(email: string): Promise<Organization | null> {
        return this.organizationRepository.getByEmail(email);
    }
}