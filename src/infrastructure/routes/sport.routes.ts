//Importación de express
import { Router } from "express";
import { SportController } from "../controllers/sport.controllers.js";
import { CreateSportUseCase } from "../../application/useCase/sports/create-sport.use-case.js";
import { GetSportsUseCase } from "../../application/useCase/sports/get-sports.use-case.js";
import { idGenerator, sportRepository } from "../container.js";

const router = Router();
// Inyección de dependencias
const createSportUseCase = new CreateSportUseCase(sportRepository, idGenerator);
const getSportsUseCase = new GetSportsUseCase(sportRepository, idGenerator);

const controller = new SportController(createSportUseCase, getSportsUseCase);

router.post('/', controller.create);
router.get('/', controller.getAll);

export { router as sportRouter };