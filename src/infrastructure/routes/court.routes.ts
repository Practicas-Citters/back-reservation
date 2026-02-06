import { Router } from 'express';
import { CourtController } from '../controllers/court.controller.js';
import { CreateCourtUseCase } from '../../application/useCase/court/create-court.use-case.js';
import { GetCourtsUseCase } from '../../application/useCase/court/get-courts.use-case.js';
import { courtRepository, idGenerator } from '../container.js';

const router = Router();

// Inyección de dependencias
const createCourtUseCase = new CreateCourtUseCase(courtRepository, idGenerator);
const getCourtsUseCase = new GetCourtsUseCase(courtRepository);
const courtController = new CourtController(createCourtUseCase, getCourtsUseCase);

router.post('/', courtController.create);
router.get('/', courtController.getAll);

export { router as courtRouter };
