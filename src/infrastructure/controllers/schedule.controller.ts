import type { Request, Response } from 'express';
import { Schedule } from '../../domain/entities/schedule.entity.js';
import { CreateUseCase } from '../../application/use-cases/schedule/create.use-case.js';
import { GetByCourtUseCase } from '../../application/use-cases/schedule/get-by-court.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/schedule/delete.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/schedule/get-by-id.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/schedule/update.use-case.js';
import { GetAllUseCase } from '../../application/use-cases/schedule/get-all.use-case.js';
import { GetByDayOfWeekUseCase } from '../../application/use-cases/schedule/get-by-day-of-week.use-case.js';
import { GetByDayOfWeekAndCourtUseCase } from '../../application/use-cases/schedule/get-by-day-of-week-and-court.use-case.js';
import { GetByCourtAndDateUseCase } from '../../application/use-cases/schedule/get-by-court-and-date.use-case.js';
import { DayOfWeek } from '../../domain/entities/schedule.entity.js';

export class ScheduleController {
    constructor(
        private createUseCase: CreateUseCase,
        private getByCourtUseCase: GetByCourtUseCase,
        private deleteUseCase: DeleteUseCase,
        private getByIdUseCase: GetByIdUseCase,
        private updateUseCase: UpdateUseCase,
        private getAllUseCase: GetAllUseCase,
        private getByDayOfWeekUseCase: GetByDayOfWeekUseCase,
        private getByDayOfWeekAndCourtUseCase: GetByDayOfWeekAndCourtUseCase,
        private getByCourtAndDateUseCase: GetByCourtAndDateUseCase
    ) {
        this.create = this.create.bind(this);
        this.getByCourtId = this.getByCourtId.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getByDayOfWeek = this.getByDayOfWeek.bind(this);
        this.getByDayOfWeekAndCourtId = this.getByDayOfWeekAndCourtId.bind(this);
        this.getByCourtIdAndDate = this.getByCourtIdAndDate.bind(this);
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

    async getAll(req: Request, res: Response) {
        try {
            const schedules = await this.getAllUseCase.execute();
            res.status(200).json(schedules);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByDayOfWeek(req: Request, res: Response) {
        try {
            const { dayOfWeek } = req.params;
            const schedules = await this.getByDayOfWeekUseCase.execute(dayOfWeek as DayOfWeek);
            res.status(200).json(schedules);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByDayOfWeekAndCourtId(req: Request, res: Response) {
        try {
            const { dayOfWeek, courtId } = req.params;
            const schedules = await this.getByDayOfWeekAndCourtUseCase.execute(dayOfWeek as DayOfWeek, courtId as string);
            res.status(200).json(schedules);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }

    async getByCourtIdAndDate(req: Request, res: Response) {
        try {
            const { courtId, date } = req.params;
            const schedules = await this.getByCourtAndDateUseCase.execute(courtId as string, new Date(date as string));
            res.status(200).json(schedules);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: ' + error.message });
        }
    }
}
