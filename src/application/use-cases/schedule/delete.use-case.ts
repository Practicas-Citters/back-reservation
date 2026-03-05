
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class DeleteUseCase {
    constructor(private scheduleRepository: ScheduleRepository) { }

    async execute(id: string): Promise<boolean> {
        return await this.scheduleRepository.delete(id);
    }
}
