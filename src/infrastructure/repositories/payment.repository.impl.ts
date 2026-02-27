import type { Payment } from "../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../domain/repositories/payment.repository.js";

export class PaymentRepositoryImpl implements PaymentRepository {
    private payments: Payment[] = [];

    async create(payment: Payment): Promise<Payment> {
        this.payments.push(payment);
        return payment;
    }

    async getById(id: string): Promise<Payment | null> {
        return this.payments.find(p => p.id === id) || null;
    }

    async getAllByBookingId(bookingId: string): Promise<Payment[]> {
        return this.payments.filter(p => p.booking.id === bookingId);
    }

    async getAllByUserId(userId: string): Promise<Payment[]> {
        return this.payments.filter(p => p.userId === userId);
    }
}
