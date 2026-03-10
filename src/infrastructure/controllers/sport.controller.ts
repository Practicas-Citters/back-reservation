import type { Request, Response } from 'express';
import { CreateSportUseCase } from '../../application/use-cases/sport/create.use-case.js';
import { GetSportUseCase } from '../../application/use-cases/sport/get-all.use-case.js';
import { GetSportByIdUseCase } from '../../application/use-cases/sport/get-by-id.use-case.js';
import { GetSportByNameUseCase } from '../../application/use-cases/sport/get-by-name.use-case.js';
import { UpdateSportUseCase } from '../../application/use-cases/sport/update.use-case.js';
import { DeleteSportUseCase } from '../../application/use-cases/sport/delete.use-case.js';

export class SportController {
    /**
     * Constructor for SportController.
     * 
     * @param createSportUseCase - Use case to create a sport.
     * @param getSportUseCase - Use case to get all sports.
     * @param getSportByIdUseCase - Use case to get a sport by ID.
     * @param getSportByNameUseCase - Use case to get a sport by name.
     * @param updateSportUseCase - Use case to update a sport.
     * @param deleteSportUseCase - Use case to delete a sport.
     * 
     * note: `private readonly` automatically creates properties on the class that are:
     * - private: Only accessible within this class.
     * - readonly: Can only be set in the constructor (immutable).
     * This is a TypeScript shortcut for dependency injection.
     */
    constructor(
        private readonly createSportUseCase: CreateSportUseCase,
        private readonly getSportUseCase: GetSportUseCase,
        private readonly getSportByIdUseCase: GetSportByIdUseCase,
        private readonly getSportByNameUseCase: GetSportByNameUseCase,
        private readonly updateSportUseCase: UpdateSportUseCase,
        private readonly deleteSportUseCase: DeleteSportUseCase,
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getByName = this.getByName.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    /**
     * Create a new sport.
     * Expects name, iconUrl, minPlayers, maxPlayers in the request body.
     */
    async create(req: Request, res: Response) {
        try {
            const { name, iconUrl, minPlayers, maxPlayers } = req.body;

            const sport = await this.createSportUseCase.execute({
                name,
                iconUrl,
                minPlayers,
                maxPlayers
            });

            res.status(201).json(sport);

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get all sports.
     */
    async getAll(req: Request, res: Response) {
        try {
            const sports = await this.getSportUseCase.execute();
            res.status(200).json(sports);

        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a sport by its ID.
     * Expects 'id' in the route parameters.
     */
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const sport = await this.getSportByIdUseCase.execute({ id });
            res.status(200).json(sport);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Get a sport by its Name.
     * Expects 'name' in the route parameters.
     */
    async getByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Invalid Name' });
                return;
            }
            const sport = await this.getSportByNameUseCase.execute({ name });
            res.status(200).json(sport);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Update an existing sport (Partial update).
     * Method: PATCH
     * Expects 'id' in route parameters and fields to update in body.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const { name, iconUrl, minPlayers, maxPlayers } = req.body;
            const sport = await this.updateSportUseCase.execute(id, {
                name,
                iconUrl,
                minPlayers,
                maxPlayers
            });
            res.status(200).json(sport);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    /**
     * Delete a sport by its ID.
     * Expects 'id' in the route parameters.
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }
            const sport = await this.deleteSportUseCase.execute({ id });
            res.status(200).json(sport);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }
}