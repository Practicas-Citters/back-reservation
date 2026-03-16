
import { Schedule, DayOfWeek } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class GetByDayOfWeekUseCase {
    constructor(private scheduleRepository: ScheduleRepository) {}

    async execute(dayOfWeek: DayOfWeek): Promise<Schedule[]> {
        return await this.scheduleRepository.getByDayOfWeek(dayOfWeek);
    }
}
