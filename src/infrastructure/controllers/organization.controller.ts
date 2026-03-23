import type { Request, Response } from 'express';
import { CreateOrganizationUseCase } from '../../application/use-cases/organization/create.use-case.js';
import { GetAllOrganizationsUseCase } from '../../application/use-cases/organization/get-all.use-case.js';
import { GetOrganizationByIdUseCase } from '../../application/use-cases/organization/get-by-id.use-case.js';
import { GetOrganizationByNameUseCase } from '../../application/use-cases/organization/get-by-name.use-case.js';
import { GetOrganizationByEmailUseCase } from '../../application/use-cases/organization/get-by-email.use-case.js';
import { GetOrganizationByAddressUseCase } from '../../application/use-cases/organization/get-by-address.use-case.js';
import { GetOrganizationsByCityUseCase } from '../../application/use-cases/organization/get-by-city.use-case.js';
import { UpdateOrganizationUseCase } from '../../application/use-cases/organization/update.use-case.js';
import { DeleteOrganizationUseCase } from '../../application/use-cases/organization/delete.use-case.js';

import { OrganizationSchema } from '../validation/organization.schema.js';

export class OrganizationController {
    constructor(
        private readonly createOrganizationUseCase: CreateOrganizationUseCase,
        private readonly getAllOrganizationsUseCase: GetAllOrganizationsUseCase,
        private readonly getOrganizationByIdUseCase: GetOrganizationByIdUseCase,
        private readonly getOrganizationByNameUseCase: GetOrganizationByNameUseCase,
        private readonly getOrganizationByEmailUseCase: GetOrganizationByEmailUseCase,
        private readonly getOrganizationByAddressUseCase: GetOrganizationByAddressUseCase,
        private readonly getOrganizationsByCityUseCase: GetOrganizationsByCityUseCase,
        private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
        private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getByAddress = this.getByAddress.bind(this);
        this.getByCity = this.getByCity.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response) {
        try {
            const validatedData = OrganizationSchema.parse(req.body);
            const organization = await this.createOrganizationUseCase.execute(validatedData);
            res.status(201).json(organization);
        } catch (error: any) {
            console.error(error);
            if (error.name === 'ZodError') {
                res.status(400).json({ error: 'Validation Error', details: error.errors });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const organizations = await this.getAllOrganizationsUseCase.execute();
            res.status(200).json(organizations);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const organization = await this.getOrganizationByIdUseCase.execute(id);
            res.status(200).json(organization);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid Name' });
                return;
            }
            const organization = await this.getOrganizationByNameUseCase.execute(name);
            res.status(200).json(organization);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            if (!email || typeof email !== 'string') {
                res.status(400).json({ error: 'Invalid Email' });
                return;
            }
            const organization = await this.getOrganizationByEmailUseCase.execute(email);
            res.status(200).json(organization);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByAddress(req: Request, res: Response) {
        try {
            const { address } = req.params;
            if (!address || typeof address !== 'string') {
                res.status(400).json({ error: 'Invalid Address' });
                return;
            }
            const organization = await this.getOrganizationByAddressUseCase.execute(address);
            res.status(200).json(organization);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByCity(req: Request, res: Response) {
        try {
            const { city } = req.params;
            if (!city || typeof city !== 'string') {
                res.status(400).json({ error: 'Invalid City' });
                return;
            }
            const organizations = await this.getOrganizationsByCityUseCase.execute(city);
            res.status(200).json(organizations);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const validatedData = OrganizationSchema.partial().parse(req.body);
            const organization = await this.updateOrganizationUseCase.execute(id, validatedData as any);
            res.status(200).json(organization);
        } catch (error: any) {
            console.error(error);
            if (error.name === 'ZodError') {
                res.status(400).json({ error: 'Validation Error', details: error.errors });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const success = await this.deleteOrganizationUseCase.execute(id);
            res.status(200).json({ success });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }
}
