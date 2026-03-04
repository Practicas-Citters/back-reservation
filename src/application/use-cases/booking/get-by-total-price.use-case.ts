import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByTotalPriceInput {
    totalPrice: number;
}

// Use Case to get bookings by total price.
export class GetBookingsByTotalPriceUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the retrieval of bookings by total price.
     * @param input - Input object containing the total price to filter by.
     * @returns A promise that resolves to an array of Booking entities.
     */
    async execute(input: GetBookingByTotalPriceInput): Promise<Booking[]> {
        return this.bookingRepository.getByTotalPrice(input.totalPrice);
    }
}
