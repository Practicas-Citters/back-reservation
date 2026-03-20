import type { SportRepository } from '../../domain/repositories/sport.domain.repository.js';
import { Sport } from '../../domain/entities/sport.entity.js';


export class InMemorySportRepository implements SportRepository {
    private sports: Sport[] = [];

    // Create a sport
    async create(sport: Sport): Promise<Sport> {
        this.sports.push(sport);
        return sport;
    }

    // Search a sport by name
    async getByName(name: string): Promise<Sport | null> {
        const sport = this.sports.find(s => s.name.toLowerCase() === name.toLowerCase());
        return sport || null;
    }

    // Search a sport by id
    async getById(id: string): Promise<Sport | null> {
        const sport = this.sports.find(s => s.id === id);
        return sport || null;
    }

    // Update a sport
    async update(sport: Sport): Promise<Sport> {
        const index = this.sports.findIndex(s => s.id === sport.id);
        if (index !== -1) {
            this.sports[index] = sport;
            return sport;
        }
        throw new Error('Sport not found');
    }

    // Delete a sport
    async delete(id: string): Promise<boolean> {
        const index = this.sports.findIndex(s => s.id === id);
        if (index !== -1) {
            this.sports.splice(index, 1);
            return true;
        }
        return false;
    }

    // Get all sports
    async getAll(): Promise<Sport[]> {
        return this.sports;
    }
}
