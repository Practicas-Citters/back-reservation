import { Payment, PaymentStatus, PaymentMethod } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.domain.repository.js";
import type { Booking } from "../../../domain/entities/booking.entity.js";

// Use case to create a payment

interface CreatePaymentInput {
    amount: number;
    method: PaymentMethod;
    userId: string;
    booking: Booking;
}

export class CreatePaymentUseCase {
    constructor(
        private paymentRepository: PaymentRepository,
        private idGenerator: { generate(): string }
    ) { }

    async execute(input: CreatePaymentInput): Promise<Payment> {
        const payment = new Payment(
            this.idGenerator.generate(),
            input.amount,
            PaymentStatus.PENDING,
            input.method,
            null, // Initial transactionId
            input.userId,
            input.booking,
            new Date().toISOString()
        );

        return await this.paymentRepository.create(payment);
    }
}
