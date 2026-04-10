import bcrypt from 'bcryptjs';
import type { PasswordHasher } from '../../application/use-cases/user/create.use-case.js';
import type { PasswordComparer } from '../../application/use-cases/user/login.use-case.js';

export class BcryptPasswordHasher implements PasswordHasher, PasswordComparer {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
