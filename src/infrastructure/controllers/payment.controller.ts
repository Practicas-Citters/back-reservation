import type { Request, Response } from 'express';
import { ProcessPaymentUseCase } from '../../application/useCase/payment/process-payment.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/useCase/payment/get-payment-history.use-case.js';

export class PaymentController {
    constructor(
        private processPaymentUseCase: ProcessPaymentUseCase,
        private getPaymentHistoryUseCase: GetPaymentHistoryUseCase
    ) {
        this.process = this.process.bind(this);
        this.getHistory = this.getHistory.bind(this);
    }

    async process(req: Request, res: Response) {
        try {
            const { amount, method, userId, booking } = req.body;

            // En un caso real, aquí validaríamos los datos (DTO)
            const payment = await this.processPaymentUseCase.execute({
                amount,
                method,
                userId,
                booking
            });

            res.status(201).json(payment);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getHistory(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const history = await this.getPaymentHistoryUseCase.execute(userId as string);
            res.status(200).json(history);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
