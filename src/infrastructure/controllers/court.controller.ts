import type { Request, Response } from 'express';
import { CreateCourtUseCase } from '../../application/use-cases/court/create.use-case.js';
import { GetAllCourtsUseCase } from '../../application/use-cases/court/get-all.use-case.js';
import { GetCourtBySportUseCase } from '../../application/use-cases/court/get-by-sport.use-case.js';
import { GetCourtByIdUseCase } from '../../application/use-cases/court/get-by-id.use-case.js';
import { GetCourtByLocationUseCase } from '../../application/use-cases/court/get-by-location.use-case.js';
import { GetCourtByOrganizationUseCase } from '../../application/use-cases/court/get-by-organization.use-case.js';
import { GetCourtByNameUseCase } from '../../application/use-cases/court/get-by-name.use-case.js';
import { UpdateCourtUseCase } from '../../application/use-cases/court/update.use-case.js';
import { DeleteCourtUseCase } from '../../application/use-cases/court/delete.use-case.js';

export class CourtController {
    constructor(
        private readonly createCourtUseCase: CreateCourtUseCase,
        private readonly getCourtsUseCase: GetAllCourtsUseCase,
        private readonly getCourtBySportUseCase: GetCourtBySportUseCase,
        private readonly getCourtByIdUseCase: GetCourtByIdUseCase,
        private readonly getCourtByLocationUseCase: GetCourtByLocationUseCase,
        private readonly getCourtByOrganizationUseCase: GetCourtByOrganizationUseCase,
        private readonly getCourtByNameUseCase: GetCourtByNameUseCase,
        private readonly updateCourtUseCase: UpdateCourtUseCase,
        private readonly deleteCourtUseCase: DeleteCourtUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getBySport = this.getBySport.bind(this);
        this.getById = this.getById.bind(this);
        this.getByLocation = this.getByLocation.bind(this);
        this.getByOrganization = this.getByOrganization.bind(this);
        this.getByName = this.getByName.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new court.
     * Expects name, description, image, capacity, pricePerHour, isAvailable, sport, organization in the request body.
     */
    async create(req: Request, res: Response) {
        try {
            const court = await this.createCourtUseCase.execute(req.body);
            res.status(201).json({ message: 'Court created successfully', court });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get all courts.
     */
    async getAll(req: Request, res: Response) {
        try {
            const courts = await this.getCourtsUseCase.execute();
            res.status(200).json(courts);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a court by its ID.
     * Expects 'id' in the route parameters.
     */
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid court ID' });
                return;
            }
            const court = await this.getCourtByIdUseCase.execute(id);
            if (!court) {
                res.status(404).json({ error: 'Court not found' });
                return;
            }
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a court by its Name.
     * Expects 'name' in the route parameters.
     */
    async getByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid court name' });
                return;
            }
            const court = await this.getCourtByNameUseCase.execute(name);
            if (!court) {
                res.status(404).json({ error: 'Court not found' });
                return;
            }
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a court by its location
     * Expects 'location' in the route parameters
     */
    async getByLocation(req: Request, res: Response) {
        try {
            const { location } = req.params;
            if (!location || typeof location !== 'string') {
                res.status(400).json({ error: 'Invalid location' });
                return;
            }
            const court = await this.getCourtByLocationUseCase.execute(location);
            if (!court) {
                res.status(404).json({ error: 'Court not found' });
                return;
            }
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get courts by Sport ID.
     * Expects 'sport' in the route parameters.
     */
    async getBySport(req: Request, res: Response) {
        try {
            const { sport } = req.params;
            if (!sport || typeof sport !== 'string') {
                res.status(400).json({ error: 'Invalid sport' });
                return;
            }
            const court = await this.getCourtBySportUseCase.execute(sport);
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get courts by Organization ID.
     * Expects 'organization' in the route parameters.
     */
    async getByOrganization(req: Request, res: Response) {
        try {
            const { organization } = req.params;
            if (!organization || typeof organization !== 'string') {
                res.status(400).json({ error: 'Invalid organization' });
                return;
            }
            const court = await this.getCourtByOrganizationUseCase.execute(organization);
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Update an existing court (Partial update).
     * Method: PATCH
     * Expects 'id' in route parameters and fields to update in body.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid court ID' });
                return;
            }

            const { name, description, image, capacity, pricePerHour, isAvailable, sportId, organizationId } = req.body;

            // Validations
            if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
                res.status(400).json({ error: 'Invalid name. Must be a non-empty string.' });
                return;
            }

            if (capacity !== undefined) {
                if (typeof capacity !== 'number' || !Number.isInteger(capacity) || capacity <= 0) {
                    res.status(400).json({ error: 'Invalid capacity. Must be a positive integer.' });
                    return;
                }
            }

            if (pricePerHour !== undefined) {
                if (typeof pricePerHour !== 'number' || pricePerHour < 0) {
                    res.status(400).json({ error: 'Invalid pricePerHour. Must be a non-negative number.' });
                    return;
                }
            }

            try {
                // Pass validated data (UpdateCourtInput structure) to UseCase
                const court = await this.updateCourtUseCase.execute(id, {
                    name,
                    description,
                    image,
                    capacity,
                    pricePerHour,
                    isAvailable,
                    sportId,
                    organizationId
                });
                res.status(200).json(court);
            } catch (error: any) {
                if (error.message === `Court with id ${id} not found`) {
                    res.status(404).json({ error: 'Court not found' });
                    return;
                }
                throw error;
            }

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Delete a court by its ID.
     * Expects 'id' in the route parameters.
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid court ID' });
                return;
            }
            const court = await this.deleteCourtUseCase.execute(id);
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }
}

