
import { User, UserRole } from "../../../domain/entities/user.entity.js";
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";

// Definimos un puerto para el servicio de encriptación (Hexagonal: puerto de salida)
// Esto permite que la implementación real (bcrypt, argon2) esté en infraestructura.
export interface PasswordHasher {
    hash(password: string): Promise<string>;
}

// Definimos un puerto para generar IDs (Hexagonal: puerto de salida)
export interface IdGenerator {
    generate(): string;
}

export interface RegisterUserDto {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    birthDate: Date;
    // role, isPremium, points se inicializan por defecto
}

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly idGenerator: IdGenerator,
    ) { }



    async execute(dto: RegisterUserDto): Promise<User> {



        // 1. Verificar si el usuario ya existe

        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new Error(`User with email ${dto.email} already exists`);
        }

        // 2. Hashear la contraseña
        const hashedPassword = await this.passwordHasher.hash(dto.password);

        // 3. Generar ID y crear la entidad User
        // Valores por defecto: role=USUARIO, profilePicture='', isPremium=false, points=0
        const newUser = new User(
            this.idGenerator.generate(),
            dto.fullName,
            dto.username,
            dto.email,
            hashedPassword,
            dto.phone,
            dto.birthDate,
            UserRole.USUARIO,
            '', // profilePicture por defecto vacía o url default
            false,
            0
        );

        // 4. Guardar en repositorio
        return this.userRepository.create(newUser);
    }
}
