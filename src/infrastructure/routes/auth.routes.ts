import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { RegisterUserUseCase } from '../../application/useCase/auth/register-user.use-case.js';
import { userRepository, passwordHasher, idGenerator } from '../container.js';

const router = Router();

// Inyección de dependencias
const registerUserUseCase = new RegisterUserUseCase(userRepository, passwordHasher, idGenerator);
const authController = new AuthController(registerUserUseCase);

router.post('/register', authController.register);

export { router as authRouter };
