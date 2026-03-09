
import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";
import type { Court } from "../../../domain/entities/court.entity.js";
import { DayOfWeek } from "../../../domain/entities/schedule.entity.js";

interface CreateScheduleInput {
    id: string;
    court: Court;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
}

export class CreateUseCase {
    constructor(private scheduleRepository: ScheduleRepository) { }

    async execute(input: CreateScheduleInput): Promise<Schedule> {
        const schedule = new Schedule(
            input.id,
            input.court,
            input.dayOfWeek,
            input.startTime,
            input.endTime
        );

        return await this.scheduleRepository.create(schedule);
    }
}
