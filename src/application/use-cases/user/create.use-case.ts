
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

export interface CreateInput {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    birthDate: string;
    isManager: boolean;
    // isPremium, points are initialized by default
}

export class CreateUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly idGenerator: IdGenerator,
    ) { }



    async execute(input: CreateInput): Promise<User> {



        // 1. Verify if user already exists

        const existingUser = await this.userRepository.getByEmail(input.email);
        if (existingUser) {
            throw new Error(`User with email ${input.email} already exists`);
        }

        // 2. Hash the password
        const hashedPassword = await this.passwordHasher.hash(input.password);

        // 3. Generate ID and create User entity
        // Default values: role=CLIENT, profilePicture='', isPremium=false, points=0
        const newUser = new User(
            this.idGenerator.generate(),
            input.fullName,
            input.username,
            input.email,
            hashedPassword,
            input.phone,
            input.birthDate,
            input.isManager ? UserRole.MANAGER : UserRole.CLIENT,
            '', // profilePicture empty by default or default url
            false,
            0
        );

        // 4. Save in repository
        return this.userRepository.create(newUser);
    }
}
