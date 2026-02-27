import type { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/auth/register-user.use-case.js';

export class AuthController {
    constructor(private registerUserUseCase: RegisterUserUseCase) {
        this.register = this.register.bind(this);
    }

    async register(req: Request, res: Response) {
        try {



            const { fullName, username, email, password, phone, birthDate } = req.body;

            // In a real case, we would validate the data first (or use middleware/schema validation)
            const user = await this.registerUserUseCase.execute({
                fullName,
                username,
                email,
                password,
                phone,
                birthDate: new Date(birthDate)
            });

            // We return the user without the password (though we should use a response DTO)
            const response = {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role
            };

            res.status(201).json(response);
        } catch (error: any) {
            console.error(error);
            // Basic error handling
            if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }


}
