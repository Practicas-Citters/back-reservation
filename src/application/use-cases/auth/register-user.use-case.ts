
import { User, UserRole } from "../../../domain/entities/user.entity.js";
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
// Define a port for the encryption service (Hexagonal: outgoing port)
// This allows the actual implementation (bcrypt, argon2) to be in infrastructure.
export interface PasswordHasher {
    hash(password: string): Promise<string>;
}

// Define a port for generating IDs (Hexagonal: outgoing port)
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
    // role, isPremium, points are initialized by default
}

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly idGenerator: IdGenerator,
    ) { }



    async execute(dto: RegisterUserDto): Promise<User> {



        // 1. Verify if user already exists

        const existingUser = await this.userRepository.getByEmail(dto.email);
        if (existingUser) {
            throw new Error(`User with email ${dto.email} already exists`);
        }

        // 2. Hash the password
        const hashedPassword = await this.passwordHasher.hash(dto.password);

        // 3. Generate ID and create User entity
        // Default values: role=USUARIO, profilePicture='', isPremium=false, points=0
        const newUser = new User(
            this.idGenerator.generate(),
            dto.fullName,
            dto.username,
            dto.email,
            hashedPassword,
            dto.phone,
            dto.birthDate,
            UserRole.USUARIO,
            '', // profilePicture empty by default or default url
            false,
            0
        );

        // 4. Save in repository
        return this.userRepository.create(newUser);
    }
}
