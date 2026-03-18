import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";

//Use case to delete an organization by its id
export class DeleteOrganizationUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) { }

    /**
     * Executes the delete organization use case.
     * @param id - The ID of the organization to delete.
     * @returns A promise that resolves to a boolean indicating whether the organization was deleted successfully.
     */
    async execute(id: string): Promise<boolean> {
        return await this.organizationRepository.delete(id);
    }
}