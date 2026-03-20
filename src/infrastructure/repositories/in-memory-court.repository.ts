import type { CourtRepository } from '../../domain/repositories/court.domain.repository.js';
import { Court } from '../../domain/entities/court.entity.js';

export class InMemoryCourtRepository implements CourtRepository {
    private courts: Court[] = [];

    /**
     * Create a new court.
     */
    async create(court: Court): Promise<Court> {
        this.courts.push(court);
        return court;
    }

    /**
     * Get all courts.
     */
    async getAll(): Promise<Court[]> {
        return this.courts;
    }

    /**
     * Get a court by its Name.
     */
    async getByName(name: string): Promise<Court | null> {
        return this.courts.find(court => court.name.toLowerCase() === name.toLowerCase()) || null;
    }

    /**
     * Get courts by User ID.
     */
    async getByUserId(userId: string): Promise<Court[]> {
        return this.courts.filter(court => court.user.id === userId);
    }

    /**
     * Get courts by Sport ID.
     */
    async getBySport(sportId: string): Promise<Court[]> {
        return this.courts.filter(court => court.sport.id === sportId);
    }

    /**
     * Get a court by its ID.
     */
    async getById(id: string): Promise<Court | null> {
        return this.courts.find(court => court.id === id) || null;
    }

    /**
     * Get courts by Location.
     */
    async getByLocation(location: string): Promise<Court[]> {
        return this.courts.filter(court => court.location.toLowerCase() === location.toLowerCase());
    }

    /**
     * Update an existing court.
     */
    async update(id: string, court: Court): Promise<Court> {
        const index = this.courts.findIndex(court => court.id === id);
        if (index === -1) {
            throw new Error('Court not found');
        }
        this.courts[index] = court;
        return court;
    }

    /**
     * Delete a court by its ID.
     */
    async delete(id: string): Promise<boolean> {
        const index = this.courts.findIndex(court => court.id === id);
        if (index === -1) {
            throw new Error('Court not found');
        }
        this.courts.splice(index, 1);
        return true;
    }

}
