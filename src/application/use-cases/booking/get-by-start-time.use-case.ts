import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByStartTimeInput {
    startTime: string; // Format: "HH:mm"
}

// Use Case to get bookings by start time.
export class GetBookingsByStartTimeUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by start time.
     * @param input - Input object containing the start time to filter by.
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByStartTimeInput): Promise<Booking[]> {
        return this.bookingRepository.getByStartTime(input.startTime);
    }
}
