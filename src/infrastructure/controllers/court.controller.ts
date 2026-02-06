import type { Request, Response } from 'express';
import { CreateCourtUseCase } from '../../application/useCase/court/create-court.use-case.js';
import { GetCourtsUseCase } from '../../application/useCase/court/get-courts.use-case.js';

export class CourtController {
    constructor(
        private readonly createCourtUseCase: CreateCourtUseCase,
        private readonly getCourtsUseCase: GetCourtsUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
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
}
