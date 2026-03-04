import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { CreateUseCase } from '../../application/use-cases/user/create.use-case.js';
import { GetAllUseCase } from '../../application/use-cases/user/get-all.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/user/get-by-id.use-case.js';
import { GetByEmailUseCase } from '../../application/use-cases/user/get-by-email.use-case.js';
import { GetByIsPremiumUseCase } from '../../application/use-cases/user/get-by-is-premium.use-case.js';
import { GetByRoleUseCase } from '../../application/use-cases/user/get-by-role.use-case.js';
import { GetByUsernameUseCase } from '../../application/use-cases/user/get-by-username.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/user/update.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/user/delete.use-case.js';
import { userRepository, passwordHasher, idGenerator } from '../container.js';

const router = Router();

// Dependency injection
const createUseCase = new CreateUseCase(userRepository, passwordHasher, idGenerator);
const updateUseCase = new UpdateUseCase(userRepository);
const deleteUseCase = new DeleteUseCase(userRepository);
const getAllUseCase = new GetAllUseCase(userRepository);
const getByEmailUseCase = new GetByEmailUseCase(userRepository);
const getByIdUseCase = new GetByIdUseCase(userRepository);
const getByIsPremiumUseCase = new GetByIsPremiumUseCase(userRepository);
const getByRoleUseCase = new GetByRoleUseCase(userRepository);
const getByUsernameUseCase = new GetByUsernameUseCase(userRepository);



const userController = new UserController(createUseCase,
    updateUseCase, deleteUseCase, getAllUseCase,
    getByEmailUseCase, getByIdUseCase, getByIsPremiumUseCase,
    getByRoleUseCase, getByUsernameUseCase);

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/search/id/:id', userController.getById);
router.get('/search/email/:email', userController.getByEmail);
router.get('/search/isPremium/:isPremium', userController.getByIsPremium);
router.get('/search/role/:role', userController.getByRole);
router.get('/search/username/:username', userController.getByUsername);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export { router as userRouter };
