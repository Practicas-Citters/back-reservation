import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";
import type { Court } from "../../../domain/entities/court.entity.js";
import { DayOfWeek } from "../../../domain/entities/schedule.entity.js";

export interface UpdateScheduleInput {
    court?: Court;
    dayOfWeek?: DayOfWeek;
    startTime?: string;
    endTime?: string;
}

export class UpdateUseCase {
    constructor(private scheduleRepository: ScheduleRepository) { }

    async execute(id: string, input: UpdateScheduleInput): Promise<Schedule> {
        const existingSchedule = await this.scheduleRepository.getById(id);
        if (!existingSchedule) {
            throw new Error(`Schedule with id ${id} not found`);
        }

        if (input.court !== undefined) existingSchedule.court = input.court;
        if (input.dayOfWeek !== undefined) existingSchedule.dayOfWeek = input.dayOfWeek;
        if (input.startTime !== undefined) existingSchedule.startTime = input.startTime;
        if (input.endTime !== undefined) existingSchedule.endTime = input.endTime;

        return await this.scheduleRepository.update(existingSchedule);
    }
}
