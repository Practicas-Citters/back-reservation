import type { Booking } from "./booking.entity.js";

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
}

export enum PaymentMethod {
    STRIPE = 'stripe',
    PAYPAL = 'paypal',
    CASH = 'cash',
    CARD = 'card'
}

export class Payment {
    constructor(
        public id: string,
        public amount: number,
        public status: PaymentStatus,
        public method: PaymentMethod,
        public transactionId: string | null,
        public booking: Booking, // ID de la reserva asociada
        public createdAt: Date
    ) { }
}
