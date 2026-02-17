import type { Request, Response } from 'express';
import { ProcessPaymentUseCase } from '../../application/useCase/payment/process-payment.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/useCase/payment/get-payment-history.use-case.js';
import { GetPaymentByIdUseCase } from '../../application/useCase/payment/get-payment-by-id.use-case.js';
import { GetBookingPaymentsUseCase } from '../../application/useCase/payment/get-booking-payments.use-case.js';

export class PaymentController {
    constructor(
        private processPaymentUseCase: ProcessPaymentUseCase,
        private getPaymentHistoryUseCase: GetPaymentHistoryUseCase,
        private getPaymentByIdUseCase: GetPaymentByIdUseCase,
        private getBookingPaymentsUseCase: GetBookingPaymentsUseCase

    ) {
        this.process = this.process.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.getById = this.getById.bind(this);
        this.getBookingPayments = this.getBookingPayments.bind(this);
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

    async getById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'Payment ID is required' });
        }

        const payment = await this.getPaymentByIdUseCase.execute(id as string);
        res.json(payment);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    }
}

async getBookingPayments(req: Request, res: Response) {
    try {
        const { bookingId } = req.params;
        
        if (!bookingId) {
            return res.status(400).json({ error: 'Booking ID is required' });
        }

        const payments = await this.getBookingPaymentsUseCase.execute(bookingId as string);
        res.json(payments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: 'Booking payments not found' });
        }
    }
}
}
