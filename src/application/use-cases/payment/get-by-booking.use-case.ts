import type { Payment } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.domain.repository.js";

// Use case to retrieve all payments for a booking (findAllByBookingId)


export class GetBookingPaymentsUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(bookingId: string): Promise<Payment[]> {
        return await this.paymentRepository.getAllByBookingId(bookingId);
    }
}