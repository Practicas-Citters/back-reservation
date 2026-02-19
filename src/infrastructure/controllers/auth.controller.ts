import type { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/useCase/auth/register-user.use-case.js';

export class AuthController {
    constructor(private registerUserUseCase: RegisterUserUseCase) {
        this.register = this.register.bind(this);
    }

    async register(req: Request, res: Response) {
        try {



            const { fullName, username, email, password, phone, birthDate } = req.body;

            // En un caso real, validaríamos los datos antes (o usaríamos un middleware/schema validation)
            const user = await this.registerUserUseCase.execute({
                fullName,
                username,
                email,
                password,
                phone,
                birthDate: new Date(birthDate)
            });

            // Retornamos el usuario sin la contraseña (aunque deberíamos usar un DTO de respuesta)
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
            // Manejo básico de errores
            if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }


}
