import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { ProcessPaymentUseCase } from '../../application/use-cases/payment/process.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/use-cases/payment/get-history.use-case.js';
import { GetPaymentByIdUseCase } from '../../application/use-cases/payment/get-by-id.use-case.js';
import { GetBookingPaymentsUseCase } from '../../application/use-cases/payment/get-by-booking.use-case.js';
import { paymentRepository, idGenerator } from '../container.js';

const router = Router();

// Dependency injection
const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository, idGenerator);
const getPaymentHistoryUseCase = new GetPaymentHistoryUseCase(paymentRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const getBookingPaymentsUseCase = new GetBookingPaymentsUseCase(paymentRepository);

const paymentController = new PaymentController(
    processPaymentUseCase,
    getPaymentHistoryUseCase,
    getPaymentByIdUseCase,
    getBookingPaymentsUseCase
);

// Routes
router.post('/', paymentController.process);
router.get('/history/:userId', paymentController.getHistory);
router.get('/:id', paymentController.getById);
router.get('/booking/:bookingId', paymentController.getBookingPayments);

export { router as paymentRouter };