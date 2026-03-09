
import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule.controller.js';
import { CreateUseCase } from '../../application/use-cases/schedule/create.use-case.js';
import { GetByCourtUseCase } from '../../application/use-cases/schedule/get-by-court.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/schedule/delete.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/schedule/get-by-id.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/schedule/update.use-case.js';
import { scheduleRepository } from '../container.js';

const router = Router();

const createUseCase = new CreateUseCase(scheduleRepository);
const getByCourtUseCase = new GetByCourtUseCase(scheduleRepository);
const deleteUseCase = new DeleteUseCase(scheduleRepository);
const getByIdUseCase = new GetByIdUseCase(scheduleRepository);
const updateUseCase = new UpdateUseCase(scheduleRepository);

const scheduleController = new ScheduleController(
    createUseCase,
    getByCourtUseCase,
    deleteUseCase,
    getByIdUseCase,
    updateUseCase
);

router.post('/', scheduleController.create);
router.get('/:id', scheduleController.getById);
router.put('/:id', scheduleController.update);
router.get('/court/:courtId', scheduleController.getByCourtId);
router.delete('/:id', scheduleController.delete);

export { router as scheduleRouter };
