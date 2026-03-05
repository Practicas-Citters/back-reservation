
import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class GetByCourtUseCase {
    constructor(private scheduleRepository: ScheduleRepository) { }

    async execute(courtId: string): Promise<Schedule[]> {
        return await this.scheduleRepository.getByCourtId(courtId);
    }
}
