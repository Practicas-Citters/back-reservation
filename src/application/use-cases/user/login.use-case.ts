
import type { UserRepository } from "../../../domain/repositories/user.domain.repository.js";
import type { User } from "../../../domain/entities/user.entity.js";

// Port for password comparison (Hexagonal: outgoing port)
export interface PasswordComparer {
    compare(password: string, hash: string): Promise<boolean>;
}

export interface LoginInput {
    email: string;
    password: string;
}

export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordComparer: PasswordComparer,
    ) { }

    async execute(input: LoginInput): Promise<User> {
        // 1. Find user by email
        const user = await this.userRepository.getByEmail(input.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // 2. Compare password with stored hash
        const isPasswordValid = await this.passwordComparer.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // 3. Return user (JWT token will be added later)
        return user;
    }
}
