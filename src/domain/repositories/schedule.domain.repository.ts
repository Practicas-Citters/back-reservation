import { Schedule, DayOfWeek } from "../entities/schedule.entity.js";

export interface ScheduleRepository {
    // CRUD
    create(schedule: Schedule): Promise<Schedule>;
    update(schedule: Schedule): Promise<Schedule>;
    delete(id: string): Promise<boolean>;
    getById(id: string): Promise<Schedule | null>;

    // Search
    getByCourtId(courtId: string): Promise<Schedule[]>;
    getAll(): Promise<Schedule[]>;
    getByDayOfWeek(dayOfWeek: DayOfWeek): Promise<Schedule[]>;
    getByDayOfWeekAndCourtId(dayOfWeek: DayOfWeek, courtId: string): Promise<Schedule[]>;
    getByCourtIdAndDate(courtId: string, date: Date): Promise<Schedule[]>;
}
