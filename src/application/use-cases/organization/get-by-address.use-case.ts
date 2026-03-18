import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

/**
 * Use Case to get an organization by its address.
 */
export class GetOrganizationByAddressUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the get organization by address use case.
     * @param address - The address of the organization to retrieve.
     * @returns The Organization entity if found, otherwise null.
     */
    async execute(address: string): Promise<Organization | null> {
        return this.organizationRepository.getByAddress(address);
    }
}
