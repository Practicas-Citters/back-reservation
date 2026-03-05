
import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class GetByIdUseCase {
    constructor(private scheduleRepository: ScheduleRepository) { }

    async execute(id: string): Promise<Schedule | null> {
        return await this.scheduleRepository.getById(id);
    }
}
