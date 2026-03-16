
import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class GetAllUseCase {
    constructor(private scheduleRepository: ScheduleRepository) {}

    async execute(): Promise<Schedule[]> {
        return await this.scheduleRepository.getAll();
    }
}
