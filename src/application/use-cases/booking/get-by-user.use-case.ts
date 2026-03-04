import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByUserInput {
    userId: string;
}

// Use Case to get bookings by user ID.
export class GetBookingsByUserUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by user ID.
     * @param input - Input object containing the user ID.
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByUserInput): Promise<Booking[]> {
        return this.bookingRepository.getByUserId(input.userId);
    }
}
