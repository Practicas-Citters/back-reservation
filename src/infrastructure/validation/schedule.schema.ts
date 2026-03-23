import { z } from "zod";
import { DayOfWeek } from "../../domain/entities/schedule.entity.js";

/**
 * Validation schema for creating Schedules.
 * 
 * This schema ensures that:
 * - courtId is a valid UUID.
 * - dayOfWeek is one of the allowed DayOfWeek enum values.
 * - Times follow the HH:mm format (24h).
 */
export const ScheduleSchema = z.object({
  courtId: z.string().uuid({ message: "Court ID must be a valid UUID" }),
  
  dayOfWeek: z.nativeEnum(DayOfWeek, {
    message: "Invalid day of the week"
  }),
  
  // Regex validation for HH:mm format (24h)
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Start time must be in HH:mm format (e.g., 09:00)"
  }),
  
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "End time must be in HH:mm format (e.g., 11:00)"
  })
}).refine((data) => {
  // Validate that the end time is after the start time
  const start = data.startTime.replace(':', '');
  const end = data.endTime.replace(':', '');
  return parseInt(end) > parseInt(start);
}, {
  message: "End time must be after start time",
  path: ["endTime"] // Error will be associated with the endTime field
});

export type CreateScheduleInput = z.infer<typeof ScheduleSchema>;
