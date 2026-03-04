import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import { Booking, BookingStatus } from "../../../domain/entities/booking.entity.js";
import type { Payment } from "../../../domain/entities/payment.entity.js";


/**
 * Input for updating a booking.
 * All fields are optional to allow partial updates.
 */
export interface UpdateBookingInput {
    id: string;
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
     * @param input - Input object with the data to update.
     * @returns The updated Booking entity.
     * @throws Error if the booking is not found.
     */
    async execute(input: UpdateBookingInput): Promise<Booking> {
        const booking = await this.bookingRepository.getById(input.id);
        if (!booking) {
            throw new Error(`Booking with id ${input.id} not found`);
        }

        // Update fields if they are present in the Input
        if (input.date !== undefined) booking.date = input.date;
        if (input.startTime !== undefined) booking.startTime = input.startTime;
        if (input.endTime !== undefined) booking.endTime = input.endTime;
        if (input.numPeople !== undefined) booking.numPeople = input.numPeople;
        if (input.totalPrice !== undefined) booking.totalPrice = input.totalPrice;
        if (input.status !== undefined) booking.status = input.status;
        if (input.payment !== undefined) booking.payment = input.payment;

        // Automatic server-side timestamp update
        booking.updatedAt = new Date().toISOString();

        return this.bookingRepository.update(input.id, booking);
    }
}
