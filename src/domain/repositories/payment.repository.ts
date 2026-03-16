import type { Payment, PaymentStatus, PaymentMethod } from "../entities/payment.entity.js";

export interface PaymentRepository {
    // CRUD
    create(payment: Payment): Promise<Payment>;
    update(id: string, updates: Partial<Pick<Payment, 'status' | 'transactionId'>>): Promise<Payment | null>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getById(id: string): Promise<Payment | null>;
    getAll(): Promise<Payment[]>;
    getByBookingId(bookingId: string): Promise<Payment[]>;
    getByUserId(userId: string): Promise<Payment[]>;
    getByStatus(status: PaymentStatus): Promise<Payment[]>;
    getByMethod(method: PaymentMethod): Promise<Payment[]>;
}
