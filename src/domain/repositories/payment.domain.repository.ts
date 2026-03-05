import type { Payment } from "../entities/payment.entity.js";

export interface PaymentRepository {
    // CRUD
    create(payment: Payment): Promise<Payment>;
    update(id: string, updates: Partial<Pick<Payment, 'status' | 'transactionId'>>): Promise<Payment | null>;
    delete(id: string): Promise<boolean>;

    // Search the payment by booking / user / id
    getById(id: string): Promise<Payment | null>;
    getAllByBookingId(bookingId: string): Promise<Payment[]>;
    getAllByUserId(userId: string): Promise<Payment[]>;
}
