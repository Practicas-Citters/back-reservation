import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByUserAndDateInput {
    userId: string;
    date: string; // Format: "YYYY-MM-DD"
}

// Use Case to get bookings by user and date.
export class GetBookingsByUserAndDateUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by user and date.
     * @param input - Input object containing the search criteria.
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByUserAndDateInput): Promise<Booking[]> {
        return this.bookingRepository.getByUserAndDate(input.userId, input.date);
    }
}
