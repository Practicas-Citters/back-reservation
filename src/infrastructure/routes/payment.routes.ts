import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { CreatePaymentUseCase } from '../../application/use-cases/payment/create.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/use-cases/payment/get-history.use-case.js';
import { GetPaymentByIdUseCase } from '../../application/use-cases/payment/get-by-id.use-case.js';
import { GetBookingPaymentsUseCase } from '../../application/use-cases/payment/get-by-booking.use-case.js';
import { UpdateUseCase } from '../../application/use-cases/payment/update.use-case.js';
import { RefundUseCase } from '../../application/use-cases/payment/refund.use-case.js';
import { DeleteUseCase } from '../../application/use-cases/payment/delete.use-case.js';
import { paymentRepository, idGenerator } from '../container.js';

const router = Router();

// Dependency injection
const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository, idGenerator);
const getPaymentHistoryUseCase = new GetPaymentHistoryUseCase(paymentRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const getBookingPaymentsUseCase = new GetBookingPaymentsUseCase(paymentRepository);
const updateUseCase = new UpdateUseCase(paymentRepository);
const refundUseCase = new RefundUseCase(paymentRepository);
const deleteUseCase = new DeleteUseCase(paymentRepository);

const paymentController = new PaymentController(
    createPaymentUseCase,
    getPaymentHistoryUseCase,
    getPaymentByIdUseCase,
    getBookingPaymentsUseCase,
    updateUseCase,
    refundUseCase,
    deleteUseCase
);

// Routes
router.post('/', paymentController.create);
router.get('/history/:userId', paymentController.getHistory);
router.get('/:id', paymentController.getById);
router.patch('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);
router.post('/:id/refund', paymentController.refund);
router.get('/booking/:bookingId', paymentController.getBookingPayments);

export { router as paymentRouter };