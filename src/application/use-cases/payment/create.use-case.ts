import { Payment, PaymentStatus, PaymentMethod } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";
import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";

// Use case to create a payment

export interface CreatePaymentInput {
    amount: number;
    method: PaymentMethod;
    userId: string;
    bookingId: string;
}

export class CreatePaymentUseCase {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly bookingRepository: BookingRepository,
        private readonly idGenerator: { generate(): string }
    ) { }

    async execute(input: CreatePaymentInput): Promise<Payment> {
        const booking = await this.bookingRepository.getById(input.bookingId);
        if (!booking) {
            throw new Error(`Booking with id ${input.bookingId} not found`);
        }

        const payment = new Payment(
            this.idGenerator.generate(),
            input.amount,
            PaymentStatus.PENDING,
            input.method,
            null, // Initial transactionId
            input.userId,
            booking,
            new Date().toISOString()
        );

        return await this.paymentRepository.create(payment);
    }
}
