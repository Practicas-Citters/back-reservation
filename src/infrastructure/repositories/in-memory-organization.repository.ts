import type { OrganizationRepository } from "../../domain/repositories/organization.domain.repository.js";
import { Organization } from "../../domain/entities/organization.entity.js";

/**
 * In-memory implementation of the OrganizationRepository interface.
 */
export class InMemoryOrganizationRepository implements OrganizationRepository {
    private organizations: Organization[] = [];

    /**
     * Creates a new organization.
     */
    async create(organization: Organization): Promise<Organization> {
        this.organizations.push(organization);
        return organization;
    }

    /**
     * Updates an existing organization.
     */
    async update(id: string, organization: Partial<Organization>): Promise<Organization> {
        const index = this.organizations.findIndex(org => org.id === id);
        if (index === -1) {
            throw new Error(`Organization with ID ${id} not found`);
        }

        const updatedOrganization = { ...this.organizations[index], ...organization } as Organization;
        this.organizations[index] = updatedOrganization;
        return updatedOrganization;
    }

    /**
     * Deletes an organization by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const index = this.organizations.findIndex(org => org.id === id);
        if (index === -1) {
            return false;
        }
        this.organizations.splice(index, 1);
        return true;
    }

    /**
     * Retrieves an organization by its ID.
     */
    async getById(id: string): Promise<Organization | null> {
        return this.organizations.find(org => org.id === id) || null;
    }

    /**
     * Retrieves all organizations.
     */
    async getAll(): Promise<Organization[]> {
        return this.organizations;
    }

    /**
     * Retrieves an organization by its name.
     */
    async getByName(name: string): Promise<Organization | null> {
        return this.organizations.find(org => org.name === name) || null;
    }

    /**
     * Retrieves an organization by its email.
     */
    async getByEmail(email: string): Promise<Organization | null> {
        return this.organizations.find(org => org.email === email) || null;
    }

    /**
     * Retrieves an organization by its address.
     */
    async getByAddress(address: string): Promise<Organization | null> {
        return this.organizations.find(org => org.address === address) || null;
    }

    /**
     * Retrieves organizations by city.
     */
    async getByCity(city: string): Promise<Organization[]> {
        return this.organizations.filter(org => org.city === city);
    }
}