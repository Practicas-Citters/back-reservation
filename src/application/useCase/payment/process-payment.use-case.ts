import { Payment, PaymentStatus, PaymentMethod } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";
import type { Booking } from "../../../domain/entities/booking.entity.js";

//caso de uso para procesar un pago (processPayment)

interface ProcessPaymentInput {
    amount: number;
    method: PaymentMethod;
    userId: string;
    booking: Booking;
}

export class ProcessPaymentUseCase {
    constructor(
        private paymentRepository: PaymentRepository,
        private idGenerator: { generate(): string }
    ) { }

    async execute(input: ProcessPaymentInput): Promise<Payment> {
        const payment = new Payment(
            this.idGenerator.generate(),
            input.amount,
            PaymentStatus.PENDING,
            input.method,
            null, // transactionId inicial
            input.userId,
            input.booking,
            new Date()
        );

        return await this.paymentRepository.create(payment);
    }
}
