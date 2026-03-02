import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking, BookingStatus } from "../../../domain/entities/booking.entity.js";
import type { Payment } from "../../../domain/entities/payment.entity.js";

/**
 * Data Transfer Object for updating a booking.
 * All fields are optional to allow partial updates.
 */
export interface UpdateBookingDto {
    date?: string;
    startTime?: string;
    endTime?: string;
    numPeople?: number;
    totalPrice?: number;
    status?: BookingStatus;
    payment?: Payment | null;
}

// Use Case to update an existing booking.
export class UpdateBookingUseCase {
    constructor(
        private readonly bookingRepository: BookingRepository,
    ) { }

    /**
     * Executes the update of a booking.
     * @param id - The ID of the booking to update.
     * @param dto - The data to update.
     * @returns The updated Booking entity.
     * @throws Error if the booking is not found.
     */
    async execute(id: string, dto: UpdateBookingDto): Promise<Booking> {
        const booking = await this.bookingRepository.getById(id);
        if (!booking) {
            throw new Error(`Booking with id ${id} not found`);
        }

        // Update fields if they are present in the DTO
        if (dto.date !== undefined) booking.date = dto.date;
        if (dto.startTime !== undefined) booking.startTime = dto.startTime;
        if (dto.endTime !== undefined) booking.endTime = dto.endTime;
        if (dto.numPeople !== undefined) booking.numPeople = dto.numPeople;
        if (dto.totalPrice !== undefined) booking.totalPrice = dto.totalPrice;
        if (dto.status !== undefined) booking.status = dto.status;
        if (dto.payment !== undefined) booking.payment = dto.payment;

        // Automatic server-side timestamp update
        booking.updatedAt = new Date().toISOString();

        return this.bookingRepository.update(id, booking);
    }
}
