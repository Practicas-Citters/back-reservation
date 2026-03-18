import { Router } from "express";
import { organizationRepository, idGenerator, userRepository } from "../container.js";

// Use Cases
import { CreateOrganizationUseCase } from "../../application/use-cases/organization/create.use-case.js";
import { GetAllOrganizationsUseCase } from "../../application/use-cases/organization/get-all.use-case.js";
import { GetOrganizationByIdUseCase } from "../../application/use-cases/organization/get-by-id.use-case.js";
import { GetOrganizationByNameUseCase } from "../../application/use-cases/organization/get-by-name.use-case.js";
import { GetOrganizationByEmailUseCase } from "../../application/use-cases/organization/get-by-email.use-case.js";
import { GetOrganizationByAddressUseCase } from "../../application/use-cases/organization/get-by-address.use-case.js";
import { GetOrganizationsByCityUseCase } from "../../application/use-cases/organization/get-by-city.use-case.js";
import { UpdateOrganizationUseCase } from "../../application/use-cases/organization/update.use-case.js";
import { DeleteOrganizationUseCase } from "../../application/use-cases/organization/delete.use-case.js";

// Controller
import { OrganizationController } from "../controllers/organization.controller.js";

const router = Router();

// Dependency injection
const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepository, idGenerator, userRepository);
const getAllOrganizationsUseCase = new GetAllOrganizationsUseCase(organizationRepository);
const getOrganizationByIdUseCase = new GetOrganizationByIdUseCase(organizationRepository);
const getOrganizationByNameUseCase = new GetOrganizationByNameUseCase(organizationRepository);
const getOrganizationByEmailUseCase = new GetOrganizationByEmailUseCase(organizationRepository);
const getOrganizationByAddressUseCase = new GetOrganizationByAddressUseCase(organizationRepository);
const getOrganizationsByCityUseCase = new GetOrganizationsByCityUseCase(organizationRepository);
const updateOrganizationUseCase = new UpdateOrganizationUseCase(organizationRepository, userRepository);
const deleteOrganizationUseCase = new DeleteOrganizationUseCase(organizationRepository);

const controller = new OrganizationController(
    createOrganizationUseCase,
    getAllOrganizationsUseCase,
    getOrganizationByIdUseCase,
    getOrganizationByNameUseCase,
    getOrganizationByEmailUseCase,
    getOrganizationByAddressUseCase,
    getOrganizationsByCityUseCase,
    updateOrganizationUseCase,
    deleteOrganizationUseCase
);

// Routes
router.post('/', controller.create);
router.get('/', controller.getAll);

// Search Filters
router.get('/search/id/:id', controller.getById);
router.get('/search/name/:name', controller.getByName);
router.get('/search/email/:email', controller.getByEmail);
router.get('/search/address/:address', controller.getByAddress);
router.get('/search/city/:city', controller.getByCity);

// Standard CRUD
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as organizationRouter };
