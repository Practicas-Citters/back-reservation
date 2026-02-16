import type { Payment } from "../entities/payment.entity.js";

export interface PaymentRepository {
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findAllByBookingId(bookingId: string): Promise<Payment[]>;
    findAllByUserId(userId: string): Promise<Payment[]>;
}
