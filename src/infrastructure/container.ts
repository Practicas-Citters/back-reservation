import { InMemoryUserRepository } from './repositories/in-memory-user.repository.js';
import { BcryptPasswordHasher } from './services/bcrypt-password.hasher.js';
import { UuidIdGenerator } from './services/uuid-id.generator.js';

// Singleton instances
export const userRepository = new InMemoryUserRepository();
export const passwordHasher = new BcryptPasswordHasher();
export const idGenerator = new UuidIdGenerator();
