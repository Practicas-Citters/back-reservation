import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { ProcessPaymentUseCase } from '../../application/useCase/payment/process-payment.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/useCase/payment/get-payment-history.use-case.js';
import { GetPaymentByIdUseCase } from '../../application/useCase/payment/get-payment-by-id.use-case.js'; 
import { GetBookingPaymentsUseCase } from '../../application/useCase/payment/get-booking-payments.use-case.js';
import { paymentRepository, idGenerator } from '../container.js';

const router = Router();

// Inyección de dependencias
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

//Rutas
router.post('/', paymentController.process);
router.get('/history/:userId', paymentController.getHistory);
router.get('/:id', paymentController.getById); 
router.get('/booking/:bookingId', paymentController.getBookingPayments); 

export { router as paymentRouter };