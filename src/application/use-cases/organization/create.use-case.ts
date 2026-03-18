import { Organization } from "../../../domain/entities/organization.entity.js";
import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";

// Define a port to generate IDs (Hexagonal: output port)
export interface IdGenerator {
    generate(): string;
}

export interface CreateOrganizationInput {
    name: string;
    description: string | null;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    logo: string | null;
    bannerImage: string | null;
    isActive: boolean;
    managers: string[];
}

// Use case to create a new organization.
export class CreateOrganizationUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly idGenerator: IdGenerator,
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the creation of an organization.
     * @param input - Data Transfer Object with organization details.
     * @returns The created Organization entity.
     */

    async execute(input: CreateOrganizationInput): Promise<Organization> {
        const managers = await Promise.all(
            input.managers.map(async (managerId) => {
                const manager = await this.userRepository.getById(managerId);
                if (!manager) {
                    throw new Error(`Manager with id ${managerId} not found`);
                }
                return manager;
            })
        );

        const newId = this.idGenerator.generate();

        const newOrganization = new Organization(
            newId,
            input.name,
            input.description,
            input.email,
            input.phone,
            input.address,
            input.city,
            input.zipCode,
            input.logo,
            input.bannerImage,
            input.isActive,
            managers
        );

        return await this.organizationRepository.create(newOrganization);
    }
}