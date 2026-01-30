
import { User } from "../entities/user.entity.js";

export interface UserRepository {
    /**
     * Registra un nuevo usuario en la base de datos.
     */
    create(user: User): Promise<User>;

    /**
     * Busca un usuario por su email.
     * Útil para el login y validaciones de unicidad.
     */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Busca un usuario por su ID.
     */
    findById(id: string): Promise<User | null>;

    /**
     * Actualiza los datos de un usuario existente.
     */
    update(user: User): Promise<User>;

}
