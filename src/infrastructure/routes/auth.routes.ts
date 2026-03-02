import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { CreateUseCase } from '../../application/use-cases/user/create.use-case.js';
import { userRepository, passwordHasher, idGenerator } from '../container.js';

const router = Router();

// Dependency injection
const registerUserUseCase = new CreateUseCase(userRepository, passwordHasher, idGenerator);
const authController = new UserController(registerUserUseCase);

router.post('/register', authController.create);

export { router as authRouter };
