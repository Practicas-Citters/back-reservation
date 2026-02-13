
import { Sport } from "../entities/sport.entity.js";

export interface SportRepository {
    /**
     * Register a new sport in the database.
     */
    create(sport: Sport): Promise<Sport>;

    /**
     * Search a sport by name.
     * Useful for login and uniqueness validations.
     */
    GetByName(name: string): Promise<Sport | null>;

    /**
     * Search a sport by id.
     */
    GetById(id: string): Promise<Sport | null>;

    /**
     * Update a sport.
     */
    update(id: string, sport: Sport): Promise<Sport>;

    /**
     * Delete a sport from the database.
     */
    delete(id: string): Promise<boolean>;

    /**
     * Search all sports in the database.
     */
    GetAll(): Promise<Sport[]>;

    // @QUESTION: Implement other method regardig the minPlayers and maxPlayers?

}