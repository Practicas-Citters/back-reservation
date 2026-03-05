import type { Payment } from "../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../domain/repositories/payment.domain.repository.js";

export class PaymentRepositoryImpl implements PaymentRepository {
    private payments: Payment[] = [];

    /**
     * Create a new payment.
     */
    async create(payment: Payment): Promise<Payment> {
        this.payments.push(payment);
        return payment;
    }

    /**
     * Get a payment by its ID.
     */
    async getById(id: string): Promise<Payment | null> {
        return this.payments.find(p => p.id === id) || null;
    }

    /**
     * Update an existing payment.
     */
    async update(id: string, updates: Partial<Pick<Payment, 'status' | 'transactionId'>>): Promise<Payment | null> {
        const payment = this.payments.find(p => p.id === id);
        if (!payment) return null;

        Object.assign(payment, updates);
        return payment;
    }

    /**
     * Delete a payment by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const index = this.payments.findIndex(p => p.id === id);
        if (index === -1) return false;

        this.payments.splice(index, 1);
        return true;
    }

    /**
     * Get all payments associated with a specific booking ID.
     */
    async getAllByBookingId(bookingId: string): Promise<Payment[]> {
        return this.payments.filter(p => p.booking.id === bookingId);
    }

    /**
     * Get all payments associated with a specific user ID.
     */
    async getAllByUserId(userId: string): Promise<Payment[]> {
        return this.payments.filter(p => p.userId === userId);
    }
}
