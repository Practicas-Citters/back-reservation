
import { Sport } from "../entities/sport.entity.js";

export interface SportRepository {
    // CRUD
    create(sport: Sport): Promise<Sport>;
    update(sport: Sport): Promise<Sport>;
    delete(id: string): Promise<boolean>;

    // Search the sport by name / id / all of them
    getByName(name: string): Promise<Sport | null>;
    getById(id: string): Promise<Sport | null>;
    getAll(): Promise<Sport[]>;

}