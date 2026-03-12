import type { Request, Response } from 'express';
import { Schedule } from '../../domain/entities/schedule.entity.js';
import { CreateUseCase } from '../../application/use-cases/schedule/create.use-case.js';
import { GetByCourtUseCase } from '../../application/use-cases/schedule/get-by-court.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/schedule/delete.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/schedule/get-by-id.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/schedule/update.use-case.js';

export class ScheduleController {
    constructor(
        private createUseCase: CreateUseCase,
        private getByCourtUseCase: GetByCourtUseCase,
        private deleteUseCase: DeleteUseCase,
        private getByIdUseCase: GetByIdUseCase,
        private updateUseCase: UpdateUseCase
    ) {
        this.create = this.create.bind(this);
        this.getByCourtId = this.getByCourtId.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req: Request, res: Response) {
        try {
            const { courtId, dayOfWeek, startTime, endTime } = req.body;
            const schedule = await this.createUseCase.execute({
                courtId,
                dayOfWeek,
                startTime,
                endTime
            });
            res.status(201).json(schedule);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByCourtId(req: Request, res: Response) {
        try {
            const { courtId } = req.params;
            const schedules = await this.getByCourtUseCase.execute(courtId as string);
            res.status(200).json(schedules);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await this.deleteUseCase.execute(id as string);
            if (!deleted) {
                return res.status(404).json({ error: 'Schedule not found' });
            }
            res.status(204).send();
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const schedule = await this.getByIdUseCase.execute(id as string);
            if (!schedule) {
                return res.status(404).json({ error: 'Schedule not found' });
            }
            res.status(200).json(schedule);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updated = await this.updateUseCase.execute(id as string, req.body);
            res.status(200).json(updated);
        } catch (error: any) {
            console.error(error);
            if (error.message.includes('not found')) {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }
}
