import type { SportRepository } from '../../domain/repositories/sport.domain.repository.js';
import { Sport } from '../../domain/entities/sport.entity.js';


export class InMemorySportRepository implements SportRepository {
    private sports: Sport[] = [];

    // Crear un deporte
    async create(sport: Sport): Promise<Sport> {
        this.sports.push(sport);
        return sport;
    }

    // Buscar un deporte por su nombre
    async findByName(name: string): Promise<Sport | null> {
        const sport = this.sports.find(s => s.name === name);
        return sport || null;
    }

    // Buscar un deporte por su ID
    async findById(id: string): Promise<Sport | null> {
        const sport = this.sports.find(s => s.id === id);
        return sport || null;
    }

    // Actualizar un deporte
    async update(sport: Sport): Promise<Sport> {
        const index = this.sports.findIndex(s => s.id === sport.id);
        if (index !== -1) {
            this.sports[index] = sport;
            return sport;
        }
        throw new Error('Sport not found');
    }

    // Eliminar un deporte
    async delete(sport: Sport): Promise<void> {
        const index = this.sports.findIndex(s => s.id === sport.id);
        if (index !== -1) {
            this.sports.splice(index, 1);
        }
        throw new Error('Sport not found');
    }

    // Buscar todos los deportes
    async findAll(): Promise<Sport[]> {
        return this.sports;
    }
}