import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByEndTimeInput {
    endTime: string; // Format: "HH:mm"
}

// Use Case to get bookings by end time.
export class GetBookingsByEndTimeUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by end time.
     * @param input - Input object containing the end time to filter by.
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByEndTimeInput): Promise<Booking[]> {
        return this.bookingRepository.getByEndTime(input.endTime);
    }
}
