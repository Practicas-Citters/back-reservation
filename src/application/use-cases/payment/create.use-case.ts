import { Payment, PaymentStatus, PaymentMethod } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";
import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking, BookingStatus } from "../../../domain/entities/booking.entity.js";

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
        try{
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

        
        const finalPayment = await this.paymentRepository.create(payment);
        // Update booking status to CONFIRMED
        const updatedBooking: Partial<Booking> = {
            status: BookingStatus.CONFIRMED
        };

        // Save the updated booking status using the booking id
        await this.bookingRepository.update(input.bookingId, updatedBooking);
        return finalPayment;
    }
    catch (error) {
        throw new Error(`Payment cancelled: ${error instanceof Error ? error.message : String(error)}`);
    }
    }
}
