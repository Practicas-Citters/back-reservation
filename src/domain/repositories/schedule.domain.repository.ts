
import { Schedule } from "../entities/schedule.entity.js";

export interface ScheduleRepository {
    // CRUD
    create(schedule: Schedule): Promise<Schedule>;
    update(schedule: Schedule): Promise<Schedule>;
    delete(id: string): Promise<boolean>;

    // Search
    getById(id: string): Promise<Schedule | null>;
    getByCourtId(courtId: string): Promise<Schedule[]>;
}
