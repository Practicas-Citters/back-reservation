import { Schedule } from "../../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../../domain/repositories/schedule.domain.repository.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import { DayOfWeek } from "../../../domain/entities/schedule.entity.js";

interface IdGenerator {
    generate(): string;
}

interface CreateUseCaseInput {
    courtId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
}

export class CreateUseCase {
    constructor(
        private scheduleRepository: ScheduleRepository,
        private courtRepository: CourtRepository,
        private idGenerator: IdGenerator
    ) { }

    async execute(input: CreateUseCaseInput): Promise<Schedule> {
        const court = await this.courtRepository.getById(input.courtId);
        if (!court) {
            throw new Error(`Court with id ${input.courtId} not found`);
        }

        const id = this.idGenerator.generate();

        const schedule = new Schedule(
            id,
            court,
            input.dayOfWeek,
            input.startTime,
            input.endTime
        );

        return await this.scheduleRepository.create(schedule);
    }
}
