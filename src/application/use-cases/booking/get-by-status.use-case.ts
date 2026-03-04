import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking, BookingStatus } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByStatusInput {
    status: BookingStatus;
}

// Use Case to get bookings by status.
export class GetBookingsByStatusUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by status.
     * @param input - Input object containing the status to filter by.
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByStatusInput): Promise<Booking[]> {
        return this.bookingRepository.getByStatus(input.status);
    }
}
