
import { Court } from "../entities/court.entity.js";

export interface CourtRepository {
    // CRUD
    create(court: Court): Promise<Court>;
    update(id: string, court: Court): Promise<Court>;
    delete(id: string): Promise<boolean>;

    // Search the court by user / sport / name / id / all of them
    getByUserId(userId: string): Promise<Court[]>;
    getBySport(sportId: string): Promise<Court[]>;
    getByName(name: string): Promise<Court | null>;
    getById(id: string): Promise<Court | null>;
    getAll(): Promise<Court[]>;

}
