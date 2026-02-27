import type { Payment } from "../entities/payment.entity.js";

export interface PaymentRepository {
    // CRUD
    create(payment: Payment): Promise<Payment>;

    // Search the payment by booking / user / id
    getById(id: string): Promise<Payment | null>;
    getAllByBookingId(bookingId: string): Promise<Payment[]>;
    getAllByUserId(userId: string): Promise<Payment[]>;
}
