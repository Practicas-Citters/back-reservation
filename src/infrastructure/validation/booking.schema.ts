import { z } from "zod";
import { BookingStatus } from "../../domain/entities/booking.entity.js";

/**
 * Validation schema for creating and updating Bookings.
 * 
 * This schema ensures that:
 * - IDs are valid UUIDs.
 * - Date follows the YYYY-MM-DD format and is logically valid.
 * - Times follow the HH:mm format (24h).
 * - Numbers are positive and integers where appropriate.
 */
export const BookingSchema = z.object({
    userId: z.string().uuid({ message: "User ID must be a valid UUID" }),
    courtId: z.string().uuid({ message: "Court ID must be a valid UUID" }),

    // Robust validation: REGEX format + Logical validation (months, real days, leap years)
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid format (YYYY-MM-DD)")
        .refine((val) => {
            const parts = val.split('-');
            if (parts.length !== 3) return false;

            const year = parseInt(parts[0]!, 10);
            const month = parseInt(parts[1]!, 10);
            const day = parseInt(parts[2]!, 10);

            // Create date in UTC to avoid time offset issues
            const date = new Date(Date.UTC(year, month - 1, day));

            // Logical validation: Does the year/month/day match what was created?
            // (This catches things like April 31st or Feb 29th on non-leap years)
            return date.getUTCFullYear() === year &&
                (date.getUTCMonth() + 1) === month &&
                date.getUTCDate() === day;
        }, {
            message: "The date does not exist (e.g., April 31st or February 29th in a non-leap year)"
        })
        .refine((val) => {
            const parts = val.split('-');
            const year = parseInt(parts[0]!, 10);
            const month = parseInt(parts[1]!, 10);
            const day = parseInt(parts[2]!, 10);

            const inputDate = new Date(Date.UTC(year, month - 1, day));
            const now = new Date();
            // Create "today" in UTC at 00:00 to compare only the day
            const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

            return inputDate >= today;
        }, {
            message: "You cannot make a reservation on a past date"
        }),

    // Regex validation for HH:mm format (24h)
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Start time must be in HH:mm format (e.g., 09:00)"
    }),

    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "End time must be in HH:mm format (e.g., 11:00)"
    }),

    numPeople: z.number()
        .int("Number of people must be an integer")
        .min(1, "There must be at least 1 person"),

    totalPrice: z.number()
        .min(0, "Total price cannot be negative"),

    status: z.nativeEnum(BookingStatus, {
        message: "Invalid booking status"
    }).optional(),

    payment: z.any().optional().nullable()
}).refine((data) => {
    // We only perform this check if both values are present (relevant for creation and partial updates)
    if (data.startTime && data.endTime) {
        return data.startTime < data.endTime;
    }
    return true;
}, {
    message: "Start time must be before end time",
    path: ["startTime"] // Marks the error on startTime field
});

// This type can be used in the controller to type the validated data
export type CreateBookingInput = z.infer<typeof BookingSchema>;
