import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { ProcessPaymentUseCase } from '../../application/useCase/payment/process-payment.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/useCase/payment/get-payment-history.use-case.js';
import { paymentRepository, idGenerator } from '../container.js';

const router = Router();

// Inyección de dependencias
const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository, idGenerator);
const getPaymentHistoryUseCase = new GetPaymentHistoryUseCase(paymentRepository);
const paymentController = new PaymentController(processPaymentUseCase, getPaymentHistoryUseCase);

router.post('/', paymentController.process);
router.get('/history/:userId', paymentController.getHistory);

export { router as paymentRouter };
