import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

// Use Case to get all bookings.
export class GetAllBookingsUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of all bookings.
     * @returns An array of Booking entities.
     */
    async execute(): Promise<Booking[]> {
        return this.bookingRepository.getAll();
    }
}
