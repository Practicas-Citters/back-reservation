import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByIdInput {
    id: string;
}

// Use Case to get a booking by ID.
export class GetBookingByIdUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    async execute(input: GetBookingByIdInput): Promise<Booking | null> {
        return this.bookingRepository.getById(input.id);
    }
}