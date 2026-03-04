import type { BookingRepository } from "../../domain/repositories/booking.domain.repository.js";
import { Booking, BookingStatus } from "../../domain/entities/booking.entity.js";

export class InMemoryBookingRepository implements BookingRepository {
    private bookings: Booking[] = [];

    async create(booking: Booking): Promise<Booking> {
        this.bookings.push(booking);
        return booking;
    }

    async update(id: string, booking: Partial<Booking>): Promise<Booking> {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Booking not found");
        }

        const updatedBooking = { ...this.bookings[index], ...booking } as Booking;
        this.bookings[index] = updatedBooking;
        return updatedBooking;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Booking not found");
        }
        this.bookings.splice(index, 1);
        return true;
    }

    async getById(id: string): Promise<Booking | null> {
        return this.bookings.find(b => b.id === id) || null;
    }

    async getAll(): Promise<Booking[]> {
        return this.bookings;
    }

    async getByUserId(userId: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.user.id === userId);
    }

    async getByCourtId(courtId: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.court.id === courtId);
    }

    async getByDate(date: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.date === date);
    }

    async getByStatus(status: BookingStatus): Promise<Booking[]> {
        return this.bookings.filter(b => b.status === status);
    }

    async getByTotalPrice(totalPrice: number): Promise<Booking[]> {
        return this.bookings.filter(b => b.totalPrice === totalPrice);
    }

    async getByStartTime(startTime: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.startTime === startTime);
    }

    async getByEndTime(endTime: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.endTime === endTime);
    }

    async getByUserAndDate(userId: string, date: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.user.id === userId && b.date === date);
    }

    async checkAvailability(courtId: string, date: string, startTime: string, endTime: string): Promise<boolean> {
        const overlappingBookings = this.bookings.filter(b =>
            b.court.id === courtId &&
            b.date === date &&
            ((startTime >= b.startTime && startTime < b.endTime) ||
                (endTime > b.startTime && endTime <= b.endTime) ||
                (startTime <= b.startTime && endTime >= b.endTime))
        );
        return overlappingBookings.length === 0;
    }
}