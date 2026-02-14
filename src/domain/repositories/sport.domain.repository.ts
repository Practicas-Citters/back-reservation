
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
    getByName(name: string): Promise<Sport | null>;

    /**
     * Search a sport by id.
     */
    getById(id: string): Promise<Sport | null>;

    /**
     * Update a sport.
     */
    update(sport: Sport): Promise<Sport>; // @QUESTION: Id as parameter in addition to sport?

    /**
     * Delete a sport from the database.
     */
    delete(id: string): Promise<boolean>; // @QUESTION: Id or Sport as parameter?

    /**
     * Search all sports in the database.
     */
    GetAll(): Promise<Sport[]>;

    // @QUESTION: Implement other method regardig the minPlayers and maxPlayers?

}