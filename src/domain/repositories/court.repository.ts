
import { Court } from "../entities/court.entity.js";

export interface CourtRepository {
    create(court: Court): Promise<Court>;
    findAll(): Promise<Court[]>;
}
