import type { BookingRepository } from "../../domain/repositories/booking.domain.repository.js";
import { Booking, BookingStatus } from "../../domain/entities/booking.entity.js";

export class InMemoryBookingRepository implements BookingRepository {
    private bookings: Booking[] = [];

    /**
     * Create a new booking.
     */
    async create(booking: Booking): Promise<Booking> {
        this.bookings.push(booking);
        return booking;
    }

    /**
     * Update an existing booking.
     */
    async update(id: string, booking: Partial<Booking>): Promise<Booking> {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Booking not found");
        }

        const updatedBooking = { ...this.bookings[index], ...booking } as Booking;
        this.bookings[index] = updatedBooking;
        return updatedBooking;
    }

    /**
     * Delete a booking by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Booking not found");
        }
        this.bookings.splice(index, 1);
        return true;
    }

    /**
     * Get a booking by its ID.
     */
    async getById(id: string): Promise<Booking | null> {
        return this.bookings.find(b => b.id === id) || null;
    }

    /**
     * Get all bookings.
     */
    async getAll(): Promise<Booking[]> {
        return this.bookings;
    }

    /**
     * Get bookings by User ID.
     */
    async getByUserId(userId: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.user.id === userId);
    }

    /**
     * Get bookings by Court ID.
     */
    async getByCourtId(courtId: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.court.id === courtId);
    }

    /**
     * Get bookings by Date.
     */
    async getByDate(date: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.date === date);
    }

    /**
     * Get bookings by Status.
     */
    async getByStatus(status: BookingStatus): Promise<Booking[]> {
        return this.bookings.filter(b => b.status === status);
    }

    /**
     * Get bookings by Total Price.
     */
    async getByTotalPrice(totalPrice: number): Promise<Booking[]> {
        return this.bookings.filter(b => b.totalPrice === totalPrice);
    }

    /**
     * Get bookings by Start Time.
     */
    async getByStartTime(startTime: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.startTime === startTime);
    }

    /**
     * Get bookings by End Time.
     */
    async getByEndTime(endTime: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.endTime === endTime);
    }

    /**
     * Get bookings by User ID and Date.
     */
    async getByUserAndDate(userId: string, date: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.user.id === userId && b.date === date);
    }

    /**
     * Check if a court is available for a given date and time range.
     */
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
