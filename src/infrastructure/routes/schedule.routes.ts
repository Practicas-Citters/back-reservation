
import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule.controller.js';
import { CreateUseCase } from '../../application/use-cases/schedule/create.use-case.js';
import { GetByCourtUseCase } from '../../application/use-cases/schedule/get-by-court.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/schedule/delete.use-case.js';
import { GetByIdUseCase } from '../../application/use-cases/schedule/get-by-id.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/schedule/update.use-case.js';
import { GetAllUseCase } from '../../application/use-cases/schedule/get-all.use-case.js';
import { GetByDayOfWeekUseCase } from '../../application/use-cases/schedule/get-by-day-of-week.use-case.js';
import { GetByDayOfWeekAndCourtUseCase } from '../../application/use-cases/schedule/get-by-day-of-week-and-court.use-case.js';
import { GetByCourtAndDateUseCase } from '../../application/use-cases/schedule/get-by-court-and-date.use-case.js';
import { scheduleRepository, courtRepository, idGenerator } from '../container.js';

const router = Router();

const createUseCase = new CreateUseCase(scheduleRepository, courtRepository, idGenerator);
const getByCourtUseCase = new GetByCourtUseCase(scheduleRepository);
const deleteUseCase = new DeleteUseCase(scheduleRepository);
const getByIdUseCase = new GetByIdUseCase(scheduleRepository);
const updateUseCase = new UpdateUseCase(scheduleRepository);
const getAllUseCase = new GetAllUseCase(scheduleRepository);
const getByDayOfWeekUseCase = new GetByDayOfWeekUseCase(scheduleRepository);
const getByDayOfWeekAndCourtUseCase = new GetByDayOfWeekAndCourtUseCase(scheduleRepository);
const getByCourtAndDateUseCase = new GetByCourtAndDateUseCase(scheduleRepository);

const scheduleController = new ScheduleController(
    createUseCase,
    getByCourtUseCase,
    deleteUseCase,
    getByIdUseCase,
    updateUseCase,
    getAllUseCase,
    getByDayOfWeekUseCase,
    getByDayOfWeekAndCourtUseCase,
    getByCourtAndDateUseCase
);

router.get('/', scheduleController.getAll);
router.post('/', scheduleController.create);
router.get('/:id', scheduleController.getById);
router.put('/:id', scheduleController.update);
router.get('/court/:courtId', scheduleController.getByCourtId);
router.get('/day/:dayOfWeek', scheduleController.getByDayOfWeek);
router.get('/court/:courtId/day/:dayOfWeek', scheduleController.getByDayOfWeekAndCourtId);
router.get('/court/:courtId/date/:date', scheduleController.getByCourtIdAndDate);
router.delete('/:id', scheduleController.delete);

export { router as scheduleRouter };
