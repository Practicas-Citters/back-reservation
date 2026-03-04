import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";

export interface CheckAvailabilityInput {
    courtId: string;
    date: string;
    startTime: string; // Format: "HH:mm"
    endTime: string;   // Format: "HH:mm"
}

// Use Case to check if a court is available for a given time slot.
export class CheckAvailabilityUseCase {
    constructor(private readonly bookingRepository: BookingRepository) { }

    /**
     * Executes the availability check.
     * @param input - Input object with search criteria.
     * @returns A promise that resolves to true if available, false otherwise.
     */
    async execute(input: CheckAvailabilityInput): Promise<boolean> {
        return this.bookingRepository.checkAvailability(
            input.courtId,
            input.date,
            input.startTime,
            input.endTime
        );
    }
}
