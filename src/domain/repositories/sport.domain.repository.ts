
import { Sport } from "../entities/sport.entity.js";

export interface SportRepository {
    /**
     * Registra un nuevo deporte en la base de datos.
     */
    create(sport: Sport): Promise<Sport>;

    /**
     * Busca un deporte por su nombre.
     * Útil para el login y validaciones de unicidad.
     */
    findByName(name: string): Promise<Sport | null>;

    /**
     * Busca un deporte por su ID.
     */
    findById(id: string): Promise<Sport | null>;

    /**
     * Actualiza los datos de un deporte existente.
     */
    update(sport: Sport): Promise<Sport>;

    /**
     * Elimina un deporte de la base de datos.
     */
    delete(sport: Sport): Promise<void>;

    /**
     * Busca todos los deportes de la base de datos.
     */
    findAll(): Promise<Sport[]>;

}