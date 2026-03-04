import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByDateInput {
    date: string;
}

// Use Case to get bookings by date.
export class GetBookingsByDateUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by date.
     * @param input - Input object containing the date to filter by (Format: "YYYY-MM-DD").
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByDateInput): Promise<Booking[]> {
        return this.bookingRepository.getByDate(input.date);
    }
}
