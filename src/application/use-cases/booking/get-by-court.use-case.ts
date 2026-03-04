import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking } from "../../../domain/entities/booking.entity.js";

export interface GetBookingByCourtInput {
    courtId: string;
}

// Use Case to get bookings by court ID.
export class GetBookingsByCourtUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    async execute(input: GetBookingByCourtInput): Promise<Booking[]> {
        return this.bookingRepository.getByCourtId(input.courtId);
    }
}