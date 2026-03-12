import { Router } from 'express';
import { CourtController } from '../controllers/court.controller.js';
import { CreateCourtUseCase } from '../../application/use-cases/court/create.use-case.js';
import { GetAllCourtsUseCase } from '../../application/use-cases/court/get-all.use-case.js';
import { GetCourtByIdUseCase } from '../../application/use-cases/court/get-by-id.use-case.js';
import { GetCourtByNameUseCase } from '../../application/use-cases/court/get-by-name.use-case.js';
import { GetCourtBySportUseCase } from '../../application/use-cases/court/get-by-sport.use-case.js';
import { GetCourtByUserUseCase } from '../../application/use-cases/court/get-by-user.use-case.js';
import { UpdateCourtUseCase } from '../../application/use-cases/court/update.use-case.js';
import { DeleteCourtUseCase } from '../../application/use-cases/court/delete.use-case.js';
import { courtRepository, idGenerator, sportRepository, userRepository } from '../container.js';

const router = Router();

// Dependency Injection
const createCourtUseCase = new CreateCourtUseCase(courtRepository, sportRepository, userRepository, idGenerator);
const getCourtsUseCase = new GetAllCourtsUseCase(courtRepository);
const getCourtBySportUseCase = new GetCourtBySportUseCase(courtRepository);
const getCourtByIdUseCase = new GetCourtByIdUseCase(courtRepository);
const getCourtByUserUseCase = new GetCourtByUserUseCase(courtRepository);
const getCourtByNameUseCase = new GetCourtByNameUseCase(courtRepository);
const updateCourtUseCase = new UpdateCourtUseCase(courtRepository, sportRepository, userRepository);
const deleteCourtUseCase = new DeleteCourtUseCase(courtRepository);

const courtController = new CourtController(createCourtUseCase, getCourtsUseCase,
    getCourtBySportUseCase, getCourtByIdUseCase,
    getCourtByUserUseCase, getCourtByNameUseCase,
    updateCourtUseCase, deleteCourtUseCase);

router.post('/', courtController.create);
router.get('/', courtController.getAll);
router.get('/search/id/:id', courtController.getById);
router.get('/search/sport/:sport', courtController.getBySport);
router.get('/search/user/:user', courtController.getByUser);
router.get('/search/name/:name', courtController.getByName);
router.patch('/:id', courtController.update);
router.delete('/:id', courtController.delete);

export { router as courtRouter };
