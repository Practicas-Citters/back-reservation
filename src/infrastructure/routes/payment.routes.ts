import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { CreatePaymentUseCase } from '../../application/use-cases/payment/create.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/use-cases/payment/get-history.use-case.js';
import { GetPaymentByIdUseCase } from '../../application/use-cases/payment/get-by-id.use-case.js';
import { GetBookingPaymentsUseCase } from '../../application/use-cases/payment/get-by-booking.use-case.js';
import { UpdatePaymentUseCase } from '../../application/use-cases/payment/update.use-case.js';
import { RefundPaymentUseCase } from '../../application/use-cases/payment/refund.use-case.js';
import { DeletePaymentUseCase } from '../../application/use-cases/payment/delete.use-case.js';
import { GetPaymentsByStatusUseCase } from '../../application/use-cases/payment/get-by-status.use-case.js';
import { GetPaymentsByMethodUseCase } from '../../application/use-cases/payment/get-by-method.use-case.js';
import { paymentRepository, idGenerator, bookingRepository } from '../container.js';

const router = Router();

// Dependency injection
const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository, bookingRepository, idGenerator);
const getPaymentHistoryUseCase = new GetPaymentHistoryUseCase(paymentRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const getBookingPaymentsUseCase = new GetBookingPaymentsUseCase(paymentRepository, bookingRepository);
const updatePaymentUseCase = new UpdatePaymentUseCase(paymentRepository);
const refundPaymentUseCase = new RefundPaymentUseCase(paymentRepository);
const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository);
const getPaymentsByStatusUseCase = new GetPaymentsByStatusUseCase(paymentRepository);
const getPaymentsByMethodUseCase = new GetPaymentsByMethodUseCase(paymentRepository);

const paymentController = new PaymentController(
    createPaymentUseCase,
    getPaymentHistoryUseCase,
    getPaymentByIdUseCase,
    getBookingPaymentsUseCase,
    updatePaymentUseCase,
    refundPaymentUseCase,
    deletePaymentUseCase,
    getPaymentsByStatusUseCase,
    getPaymentsByMethodUseCase
);

// Routes
router.post('/', paymentController.create);
router.get('/history/:userId', paymentController.getHistory);
router.get('/status/:status', paymentController.getByStatus);
router.get('/method/:method', paymentController.getByMethod);
router.get('/:id', paymentController.getById);
router.patch('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);
router.post('/:id/refund', paymentController.refund);
router.get('/booking/:bookingId', paymentController.getByBooking);

export { router as paymentRouter };