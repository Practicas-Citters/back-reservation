//Importation of express
import { Router } from "express";
import { bookingRepository, courtRepository, idGenerator, userRepository } from "../container.js";

// Use Cases
import { CreateBookingUseCase } from "../../application/use-cases/booking/create.use-case.js";
import { GetAllBookingsUseCase } from "../../application/use-cases/booking/get-all.use-case.js";
import { GetBookingByIdUseCase } from "../../application/use-cases/booking/get-by-id.use-case.js";
import { GetBookingsByUserUseCase } from "../../application/use-cases/booking/get-by-user.use-case.js";
import { GetBookingsByDateUseCase } from "../../application/use-cases/booking/get-by-date.use-case.js";
import { GetBookingsByStartTimeUseCase } from "../../application/use-cases/booking/get-by-start-time.use-case.js";
import { GetBookingsByEndTimeUseCase } from "../../application/use-cases/booking/get-by-end-time.use-case.js";
import { GetBookingsByTotalPriceUseCase } from "../../application/use-cases/booking/get-by-total-price.use-case.js";
import { GetBookingsByStatusUseCase } from "../../application/use-cases/booking/get-by-status.use-case.js";
import { GetBookingsByUserAndDateUseCase } from "../../application/use-cases/booking/get-by-user-and-date.use-case.js";
import { CheckAvailabilityUseCase } from "../../application/use-cases/booking/check-availability.use-case.js";
import { UpdateBookingUseCase } from "../../application/use-cases/booking/update.use-case.js";
import { DeleteBookingUseCase } from "../../application/use-cases/booking/delete.use-case.js";

// Controller
import { BookingController } from "../controllers/booking.controller.js";

const router = Router();

// Dependency injection
const createBookingUseCase = new CreateBookingUseCase(bookingRepository, userRepository, courtRepository, idGenerator);
const getAllBookingsUseCase = new GetAllBookingsUseCase(bookingRepository);
const getBookingByIdUseCase = new GetBookingByIdUseCase(bookingRepository);
const getBookingsByUserUseCase = new GetBookingsByUserUseCase(bookingRepository);
const getBookingsByDateUseCase = new GetBookingsByDateUseCase(bookingRepository);
const getBookingsByStartTimeUseCase = new GetBookingsByStartTimeUseCase(bookingRepository);
const getBookingsByEndTimeUseCase = new GetBookingsByEndTimeUseCase(bookingRepository);
const getBookingsByTotalPriceUseCase = new GetBookingsByTotalPriceUseCase(bookingRepository);
const getBookingsByStatusUseCase = new GetBookingsByStatusUseCase(bookingRepository);
const getBookingsByUserAndDateUseCase = new GetBookingsByUserAndDateUseCase(bookingRepository);
const checkAvailabilityUseCase = new CheckAvailabilityUseCase(bookingRepository);
const updateBookingUseCase = new UpdateBookingUseCase(bookingRepository);
const deleteBookingUseCase = new DeleteBookingUseCase(bookingRepository);

const controller = new BookingController(
    createBookingUseCase,
    getAllBookingsUseCase,
    getBookingByIdUseCase,
    getBookingsByUserUseCase,
    getBookingsByDateUseCase,
    getBookingsByStartTimeUseCase,
    getBookingsByEndTimeUseCase,
    getBookingsByTotalPriceUseCase,
    getBookingsByStatusUseCase,
    getBookingsByUserAndDateUseCase,
    checkAvailabilityUseCase,
    updateBookingUseCase,
    deleteBookingUseCase
);

// Routes
router.post('/', controller.create);
router.get('/', controller.getAll);

// Search Filters (following court.routes.ts pattern)
router.get('/search/id/:id', controller.getById);
router.get('/search/user/:userId', controller.getByUser);
router.get('/search/date/:date', controller.getByDate);
router.get('/search/start-time/:startTime', controller.getByStartTime);
router.get('/search/end-time/:endTime', controller.getByEndTime);
router.get('/search/total-price/:totalPrice', controller.getByTotalPrice);
router.get('/search/status/:status', controller.getByStatus);
router.get('/search/user/:userId/date/:date', controller.getByUserAndDate);

// Utility
router.post('/check-availability', controller.checkAvailability);

// Standard CRUD
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router as bookingRouter };
