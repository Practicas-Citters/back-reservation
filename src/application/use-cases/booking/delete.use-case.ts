import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

// Use Case to delete a booking by ID.
export class DeleteBookingUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the deletion of a booking.
     * @param id - The ID of the booking to delete.
     * @returns True if deletion was successful, otherwise false.
     */
    async execute(id: string): Promise<boolean> {
        return this.bookingRepository.delete(id);
    }
}