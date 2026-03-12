import { Court } from "../../../domain/entities/court.entity.js";
import type { CourtRepository } from "../../../domain/repositories/court.domain.repository.js";
import type { SportRepository } from "../../../domain/repositories/sport.domain.repository.js";
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";

// Define a port to generate IDs (Hexagonal: output port)
export interface IdGenerator {
    generate(): string;
}

export interface CreateCourtInput {
    name: string;
    description: string;
    image: string;
    capacity: number;
    pricePerHour: number;
    isAvailable: boolean;
    sportId: string;
    userId: string;
}

// Use Case to create a new court.
export class CreateCourtUseCase {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly sportRepository: SportRepository,
        private readonly userRepository: UserRepository,
        private readonly idGenerator: IdGenerator,
    ) { }

    /**
     * Executes the creation of a court.
     * @param input - Data Transfer Object with court details.
     * @returns The created Court entity.
     */
    async execute(input: CreateCourtInput): Promise<Court> {
        const sport = await this.sportRepository.getById(input.sportId);
        if (!sport) {
            throw new Error(`Sport with id ${input.sportId} not found`);
        }

        const user = await this.userRepository.getById(input.userId);
        if (!user) {
            throw new Error(`User with id ${input.userId} not found`);
        }

        const newId = this.idGenerator.generate();

        const newCourt = new Court(
            newId,
            input.name,
            input.description,
            input.image,
            input.capacity,
            input.pricePerHour,
            input.isAvailable,
            sport,
            user
        );
        return this.courtRepository.create(newCourt);
    }
}
