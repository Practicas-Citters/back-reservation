import type { Payment } from "../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../domain/repositories/payment.domain.repository.js";

export class PaymentRepositoryImpl implements PaymentRepository {
    private payments: Payment[] = [];

    async create(payment: Payment): Promise<Payment> {
        this.payments.push(payment);
        return payment;
    }

    async getById(id: string): Promise<Payment | null> {
        return this.payments.find(p => p.id === id) || null;
    }

    async update(id: string, updates: Partial<Pick<Payment, 'status' | 'transactionId'>>): Promise<Payment | null> {
        const payment = this.payments.find(p => p.id === id);
        if (!payment) return null;

        Object.assign(payment, updates);
        return payment;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.payments.findIndex(p => p.id === id);
        if (index === -1) return false;

        this.payments.splice(index, 1);
        return true;
    }

    async getAllByBookingId(bookingId: string): Promise<Payment[]> {
        return this.payments.filter(p => p.booking.id === bookingId);
    }

    async getAllByUserId(userId: string): Promise<Payment[]> {
        return this.payments.filter(p => p.userId === userId);
    }
}
