
import { Schedule, DayOfWeek } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class GetByDayOfWeekAndCourtUseCase {
    constructor(private scheduleRepository: ScheduleRepository) {}

    async execute(dayOfWeek: DayOfWeek, courtId: string): Promise<Schedule[]> {
        return await this.scheduleRepository.getByDayOfWeekAndCourtId(dayOfWeek, courtId);
    }
}
