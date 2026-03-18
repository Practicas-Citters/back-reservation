import type { OrganizationRepository } from "../../../domain/repositories/organization.domain.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import { Organization } from "../../../domain/entities/organization.entity.js";

export interface UpdateOrganizationInput {
    name?: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    logo?: string;
    bannerImage?: string;
    isActive?: boolean;
    managers?: string[];
}

/**
 * Use Case to update an existing organization.
 * Updates only the fields provided in the INPUT.
 */
export class UpdateOrganizationUseCase {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly userRepository: UserRepository
    ) { }

    /**
     * Executes the update organization use case.
     * @param id - The ID of the organization to update.
     * @param input - Data Transfer Object containing partial updates.
     * @returns The updated Organization entity.
     */
    async execute(id: string, input: UpdateOrganizationInput): Promise<Organization> {
        const organization = await this.organizationRepository.getById(id);
        if (!organization) {
            throw new Error(`Organization with id ${id} not found`);
        }

        // We use strict check ( !== undefined ) to allow updates to falsy values
        // like 0 (price) or false (isAvailable).
        if (input.name !== undefined) organization.name = input.name;
        if (input.description !== undefined) organization.description = input.description;
        if (input.email !== undefined) organization.email = input.email;
        if (input.phone !== undefined) organization.phone = input.phone;
        if (input.address !== undefined) organization.address = input.address;
        if (input.city !== undefined) organization.city = input.city;
        if (input.zipCode !== undefined) organization.zipCode = input.zipCode;
        if (input.logo !== undefined) organization.logo = input.logo;
        if (input.bannerImage !== undefined) organization.bannerImage = input.bannerImage;
        if (input.isActive !== undefined) organization.isActive = input.isActive;

        if (input.managers !== undefined) {
            const managers = await Promise.all(
                input.managers.map(async (managerId) => {
                    const manager = await this.userRepository.getById(managerId);
                    if (!manager) {
                        throw new Error(`User with id ${managerId} not found`);
                    }
                    return manager;
                })
            );
            organization.managers = managers;
        }

        return this.organizationRepository.update(id, organization);
    }
}