
import type { Court } from "./court.entity.js";

export enum DayOfWeek {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

export class Schedule {
    constructor(
        public id: string,
        public court: Court,
        public dayOfWeek: DayOfWeek,
        public startTime: string, // Format: "HH:mm"
        public endTime: string    // Format: "HH:mm"
    ) { }
}
