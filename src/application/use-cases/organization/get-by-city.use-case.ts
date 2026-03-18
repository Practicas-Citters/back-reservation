import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

/**
 * Use Case to get organizations by city.
 */
export class GetOrganizationsByCityUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the get organizations by city use case.
     * @param city - The city to search for organizations.
     * @returns An array of Organization entities found in the specified city.
     */
    async execute(city: string): Promise<Organization[]> {
        return this.organizationRepository.getByCity(city);
    }
}