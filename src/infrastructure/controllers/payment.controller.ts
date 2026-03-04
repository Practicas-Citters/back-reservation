import type { Request, Response } from 'express';
import { CreatePaymentUseCase } from '../../application/use-cases/payment/create.use-case.js';
import { GetPaymentHistoryUseCase } from '../../application/use-cases/payment/get-history.use-case.js';
import { GetPaymentByIdUseCase } from '../../application/use-cases/payment/get-by-id.use-case.js';
import { GetBookingPaymentsUseCase } from '../../application/use-cases/payment/get-by-booking.use-case.js';
import { UpdatePaymentUseCase } from '../../application/use-cases/payment/update-payment.use-case.js';
import { RefundPaymentUseCase } from '../../application/use-cases/payment/refund-payment.use-case.js';
import { DeletePaymentUseCase } from '../../application/use-cases/payment/delete-payment.use-case.js';

export class PaymentController {
    constructor(
        private createPaymentUseCase: CreatePaymentUseCase,
        private getPaymentHistoryUseCase: GetPaymentHistoryUseCase,
        private getPaymentByIdUseCase: GetPaymentByIdUseCase,
        private getBookingPaymentsUseCase: GetBookingPaymentsUseCase,
        private updatePaymentUseCase: UpdatePaymentUseCase,
        private refundPaymentUseCase: RefundPaymentUseCase,
        private deletePaymentUseCase: DeletePaymentUseCase

    ) {
        this.create = this.create.bind(this);
        this.getHistory = this.getHistory.bind(this);
        this.getById = this.getById.bind(this);
        this.getBookingPayments = this.getBookingPayments.bind(this);
        this.update = this.update.bind(this);
        this.refund = this.refund.bind(this);
        this.delete = this.delete.bind(this);
    }

    // Create a new payment record
    async create(req: Request, res: Response) {
        try {
            const { amount, method, userId, booking } = req.body;

            // In a real case, we would validate the data here (INPUT)
            const payment = await this.createPaymentUseCase.execute({
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

    // Get payment history for a specific user
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

    // Get a single payment by its ID
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

    // Get all payments associated with a booking
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
    // Update payment status or transaction details
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status, transactionId } = req.body;

            const payment = await this.updatePaymentUseCase.execute({
                id: id as string,
                status,
                transactionId
            });

            res.json(payment);
        } catch (error: any) {
            console.error(error);
            res.status(404).json({ error: error.message || 'Payment update failed' });
        }
    }
    // Process a refund for a completed payment
    async refund(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const payment = await this.refundPaymentUseCase.execute(id as string);

            res.json(payment);
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ error: error.message || 'Refund failed' });
        }
    }

    // Remove a payment record (Admin only)
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.deletePaymentUseCase.execute(id as string);
            res.status(204).send();
        } catch (error: any) {
            console.error(error);
            res.status(404).json({ error: error.message || 'Payment not found' });
        }
    }
}
