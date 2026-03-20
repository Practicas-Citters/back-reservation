
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";

export class DeleteUseCase {
    constructor(private scheduleRepository: ScheduleRepository) { }

    async execute(id: string): Promise<boolean> {
        const schedule = await this.scheduleRepository.getById(id);
        if (!schedule) {
            throw new Error(`Schedule with ID ${id} not found`);
        }
        return await this.scheduleRepository.delete(id);
    }
}
