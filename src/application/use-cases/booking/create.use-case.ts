import { Booking, BookingStatus } from "../../../domain/entities/booking.entity.js";
import type { BookingRepository } from "../../../domain/repositories/booking.domain.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";

// Port for ID generation
export interface IdGenerator {
    generate(): string;
}


// Input for Booking creation
export interface CreateBookingInput {
    userId: string;
    courtId: string;
    date: string;
    startTime: string; // Format: "HH:mm"
    endTime: string;   // Format: "HH:mm"
    numPeople: number;
    totalPrice: number;
}

// Use Case to create a new booking.
export class CreateBookingUseCase {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly userRepository: UserRepository,
        private readonly courtRepository: CourtRepository,
        private readonly idGenerator: IdGenerator
    ) { }

    /**
     * Executes the creation of a booking.
     * @param input - Input object with booking details.
     * @returns The created Booking entity.
     */
    async execute(input: CreateBookingInput): Promise<Booking> {
        // 1. Fetches User and Court entities by their IDs.
        const user = await this.userRepository.getById(input.userId);
        if (!user) {
            throw new Error(`User with id ${input.userId} not found`);
        }

        const court = await this.courtRepository.getById(input.courtId);
        if (!court) {
            throw new Error(`Court with id ${input.courtId} not found`);
        }

        // 2. Generates a unique ID and current timestamps.
        const id = this.idGenerator.generate();
        const now = new Date().toISOString();

        // 3. Creates the domain entity
        const newBooking = new Booking(
            id,
            user,
            court,
            input.date,
            input.startTime,
            input.endTime,
            input.numPeople,
            input.totalPrice,
            BookingStatus.PENDING,
            null, // Initial payment is null
            now,
            now
        );
        return this.bookingRepository.create(newBooking);
    }
}
