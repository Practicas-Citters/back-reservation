import { Organization } from "../entities/organization.entity.js";

export interface OrganizationRepository {
    // CRUD
    create(organization: Organization): Promise<Organization>;
    update(id: string, organization: Partial<Organization>): Promise<Organization>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getById(id: string): Promise<Organization | null>;
    getAll(): Promise<Organization[]>;
    getByName(name: string): Promise<Organization | null>;
    getByEmail(email: string): Promise<Organization | null>;
    getByAddress(address: string): Promise<Organization | null>;
    getByCity(city: string): Promise<Organization[]>;
}
