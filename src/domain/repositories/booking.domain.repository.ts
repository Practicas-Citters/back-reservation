import { BookingStatus, Booking } from "../entities/booking.entity.js";

export interface BookingRepository {
    // CRUD
    create(booking: Booking): Promise<Booking>;
    update(id: string, booking: Partial<Booking>): Promise<Booking>;
    delete(id: string): Promise<boolean>;

    // Search methods
    getById(id: string): Promise<Booking | null>;
    getAll(): Promise<Booking[]>;
    getByUserId(userId: string): Promise<Booking[]>;
    getByCourtId(courtId: string): Promise<Booking[]>;
    getByDate(date: string): Promise<Booking[]>;
    getByStatus(status: BookingStatus): Promise<Booking[]>;
    getByTotalPrice(totalPrice: number): Promise<Booking[]>;
    getByStartTime(startTime: string): Promise<Booking[]>;
    getByEndTime(endTime: string): Promise<Booking[]>;

    // Additional useful methods
    getByUserAndDate(userId: string, date: string): Promise<Booking[]>;
    checkAvailability(courtId: string, date: string, startTime: string, endTime: string): Promise<boolean>;
}
