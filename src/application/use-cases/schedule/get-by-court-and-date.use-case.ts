
import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class GetByCourtAndDateUseCase {
    constructor(private scheduleRepository: ScheduleRepository) {}

    async execute(courtId: string, date: Date): Promise<Schedule[]> {
        return await this.scheduleRepository.getByCourtIdAndDate(courtId, date);
    }
}
