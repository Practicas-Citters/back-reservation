import type { Payment } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";
import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";

// Use case to retrieve all payments for a booking (findAllByBookingId)

export class GetBookingPaymentsUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly bookingRepository: BookingRepository
    ) { }

    async execute(bookingId: string): Promise<Payment[]> {
        const booking = await this.bookingRepository.getById(bookingId);
        if (!booking) {
            throw new Error(`Booking with id ${bookingId} not found`);
        }
        return await this.paymentRepository.getByBookingId(bookingId);
    }
}