//Importation of express
import { Router } from "express";
import { SportController } from "../controllers/sport.controllers.js";
import { CreateSportUseCase } from "../../application/useCase/sports/create-sport.use-case.js";
import { GetSportUseCase } from "../../application/useCase/sports/getAll-sports.use-case.js";
import { idGenerator, sportRepository } from "../container.js";
import { GetSportByIdUseCase } from "../../application/useCase/sports/getById-sport.use-case.js";
import { GetSportByNameUseCase } from "../../application/useCase/sports/getByName-sport.use-case.js";
import { UpdateSportUseCase } from "../../application/useCase/sports/update-sport.use-case.js";
import { DeleteSportUseCase } from "../../application/useCase/sports/delete-sport.use-case.js";

const router = Router();
// Dependency injection
const createSportUseCase = new CreateSportUseCase(sportRepository, idGenerator);
const getSportsUseCase = new GetSportUseCase(sportRepository);
const getSportByIdUseCase = new GetSportByIdUseCase(sportRepository);
const getSportByNameUseCase = new GetSportByNameUseCase(sportRepository);
const updateSportUseCase = new UpdateSportUseCase(sportRepository);
const deleteSportUseCase = new DeleteSportUseCase(sportRepository);

const controller = new SportController(
    createSportUseCase,
    getSportsUseCase,
    getSportByIdUseCase,
    getSportByNameUseCase,
    updateSportUseCase,
    deleteSportUseCase
);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/search/:name', controller.getByName);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as sportRouter };