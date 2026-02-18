import { Router } from 'express';
import { CourtController } from '../controllers/court.controller.js';
import { CreateCourtUseCase } from '../../application/useCase/court/create-court.use-case.js';
import { GetAllCourtsUseCase } from '../../application/useCase/court/getAllCourts.use-case.js';
import { GetCourtByIdUseCase } from '../../application/useCase/court/getById.use-case.js';
import { GetCourtByNameUseCase } from '../../application/useCase/court/getByName.use-case.js';
import { GetCourtBySportUseCase } from '../../application/useCase/court/getBySport.use-case.js';
import { GetCourtByUserUseCase } from '../../application/useCase/court/getByUser.use-case.js';
import { UpdateCourtUseCase } from '../../application/useCase/court/update-court.use-case.js';
import { DeleteCourtUseCase } from '../../application/useCase/court/delete-court.use-case.js';
import { courtRepository, idGenerator } from '../container.js';

const router = Router();

// Dependency Injection
const createCourtUseCase = new CreateCourtUseCase(courtRepository, idGenerator);
const getCourtsUseCase = new GetAllCourtsUseCase(courtRepository);
const getCourtBySportUseCase = new GetCourtBySportUseCase(courtRepository);
const getCourtByIdUseCase = new GetCourtByIdUseCase(courtRepository);
const getCourtByUserUseCase = new GetCourtByUserUseCase(courtRepository);
const getCourtByNameUseCase = new GetCourtByNameUseCase(courtRepository);
const updateCourtUseCase = new UpdateCourtUseCase(courtRepository);
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
