
import type { User } from "./user.entity.js";
import type { Court } from "./court.entity.js";
import type { Payment } from "./payment.entity.js";

export enum BookingStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
}

export class Booking {
    constructor(
        public id: string,
        public user: User,
        public court: Court,
        public date: string, // Format: "YYYY-MM-DD"
        public startTime: string, // Format: "HH:mm"
        public endTime: string,   // Format: "HH:mm"
        public numPeople: number,
        public totalPrice: number,
        public status: BookingStatus,
        public payment: Payment | null, // Related to payment
        public createdAt: string,
        public updatedAt: string
    ) { }
}
