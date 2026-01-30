import { v4 as uuidv4 } from 'uuid';
import type { IdGenerator } from '../../application/useCase/auth/register-user.use-case.js';

export class UuidIdGenerator implements IdGenerator {
    generate(): string {
        return uuidv4();
    }
}
