import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";

export interface DeleteBookingInput {
    id: string;
}

/**
 * Use Case to delete a booking by its ID.
 */
export class DeleteBookingUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the deletion of a booking.
     * @param input - Input object with the ID of the booking to delete.
     * @returns A promise that resolves to true if the booking was deleted, false otherwise.
     */
    async execute(input: DeleteBookingInput): Promise<boolean> {
        return this.bookingRepository.delete(input.id);
    }
}