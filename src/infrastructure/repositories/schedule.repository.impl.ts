
import { Schedule } from "../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../domain/repositories/schedule.domain.repository.js";

export class ScheduleRepositoryImpl implements ScheduleRepository {
    private schedules: Schedule[] = [];

    async create(schedule: Schedule): Promise<Schedule> {
        this.schedules.push(schedule);
        return schedule;
    }

    async update(schedule: Schedule): Promise<Schedule> {
        const index = this.schedules.findIndex(s => s.id === schedule.id);
        if (index === -1) throw new Error("Schedule not found");
        this.schedules[index] = schedule;
        return schedule;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.schedules.findIndex(s => s.id === id);
        if (index === -1) return false;
        this.schedules.splice(index, 1);
        return true;
    }

    async getById(id: string): Promise<Schedule | null> {
        return this.schedules.find(s => s.id === id) || null;
    }

    async getByCourtId(courtId: string): Promise<Schedule[]> {
        return this.schedules.filter(s => s.court.id === courtId);
    }
}
