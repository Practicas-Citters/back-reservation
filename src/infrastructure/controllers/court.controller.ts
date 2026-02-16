import type { Request, Response } from 'express';
import { CreateCourtUseCase } from '../../application/useCase/court/create-court.use-case.js';
import { GetAllCourtsUseCase } from '../../application/useCase/court/getAllCourts.use-case.js';
import { GetCourtBySportUseCase } from '../../application/useCase/court/getBySport.use-case.js';
import { GetCourtByIdUseCase } from '../../application/useCase/court/getById.use-case.js';
import { GetCourtByUserUseCase } from '../../application/useCase/court/getByUser.use-case.js';
import { GetCourtByNameUseCase } from '../../application/useCase/court/getByName.use-case.js';
import { UpdateCourtUseCase } from '../../application/useCase/court/update-court.use-case.js';
import { DeleteCourtUseCase } from '../../application/useCase/court/delete-court.use-case.js';

export class CourtController {
    constructor(
        private readonly createCourtUseCase: CreateCourtUseCase,
        private readonly getCourtsUseCase: GetAllCourtsUseCase,
        private readonly getCourtBySportUseCase: GetCourtBySportUseCase,
        private readonly getCourtByIdUseCase: GetCourtByIdUseCase,
        private readonly getCourtByUserUseCase: GetCourtByUserUseCase,
        private readonly getCourtByNameUseCase: GetCourtByNameUseCase,
        private readonly updateCourtUseCase: UpdateCourtUseCase,
        private readonly deleteCourtUseCase: DeleteCourtUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getBySport = this.getBySport.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUser = this.getByUser.bind(this);
        this.getByName = this.getByName.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response) {
        try {
            const court = await this.createCourtUseCase.execute(req.body);
            res.status(201).json({ message: 'Court created successfully', court });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const courts = await this.getCourtsUseCase.execute();
            res.status(200).json(courts);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

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
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

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
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

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
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getByUser(req: Request, res: Response) {
        try {
            const { user } = req.params;
            if (!user || typeof user !== 'string') {
                res.status(400).json({ error: 'Invalid user' });
                return;
            }
            const court = await this.getCourtByUserUseCase.execute(user);
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log('Update Body:', req.body); // DEBUG LOG
            if (!id || typeof id !== 'string') {
                res.status(400).json({ error: 'Invalid court ID' });
                return;
            }
            const { name, description, image, capacity, pricePerHour, isAvailable, sport, user } = req.body;
            //@QUESTION: Why is it necessary to pass the id in the body?
            const court = await this.updateCourtUseCase.execute(id, { id, name, description, image, capacity, pricePerHour, isAvailable, sport, user });
            res.status(200).json(court);
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Court not found') {
                res.status(404).json({ error: 'Court not found' });
                return;
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

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
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
