import type { CourtRepository } from '../../domain/repositories/court.domain.repository.js';
import { Court } from '../../domain/entities/court.entity.js';

export class InMemoryCourtRepository implements CourtRepository {
    private courts: Court[] = [];

    async create(court: Court): Promise<Court> {
        this.courts.push(court);
        return court;
    }

    async getAll(): Promise<Court[]> {
        return this.courts;
    }

    async getByName(name: string): Promise<Court | null> {
        return this.courts.find(court => court.name === name) || null;
    }

    async getByUserId(userId: string): Promise<Court[]> {
        return this.courts.filter(court => court.user.id === userId);
    }

    async getBySport(sportId: string): Promise<Court[]> {
        return this.courts.filter(court => court.sport.id === sportId);
    }

    async getById(id: string): Promise<Court | null> {
        return this.courts.find(court => court.id === id) || null;
    }

    async update(id: string, court: Court): Promise<Court> {
        const index = this.courts.findIndex(court => court.id === id);
        if (index === -1) {
            throw new Error('Court not found');
        }
        this.courts[index] = court;
        return court;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.courts.findIndex(court => court.id === id);
        if (index === -1) {
            throw new Error('Court not found');
        }
        this.courts.splice(index, 1);
        return true;
    }

}
