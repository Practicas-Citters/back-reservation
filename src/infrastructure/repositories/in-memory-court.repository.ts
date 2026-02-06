import type { CourtRepository } from '../../domain/repositories/court.repository.js';
import { Court } from '../../domain/entities/court.entity.js';

export class InMemoryCourtRepository implements CourtRepository {
    private courts: Court[] = [];

    async create(court: Court): Promise<Court> {
        this.courts.push(court);
        return court;
    }

    async findAll(): Promise<Court[]> {
        return this.courts;
    }
}
