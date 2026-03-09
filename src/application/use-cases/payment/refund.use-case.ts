import type { PaymentRepository } from "../../../domain/repositories/payment.domain.repository.js";
import { PaymentStatus, Payment } from "../../../domain/entities/payment.entity.js";

// Use case to process payment refunds
export class RefundUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(paymentId: string): Promise<Payment> {
        const payment = await this.paymentRepository.getById(paymentId);

        if (!payment) {
            throw new Error(`Payment with ID ${paymentId} not found`);
        }

        if (payment.status !== PaymentStatus.COMPLETED) {
            throw new Error(`Only completed payments can be refunded. Current status: ${payment.status}`);
        }

        const updatedPayment = await this.paymentRepository.update(paymentId, {
            status: PaymentStatus.REFUNDED
        });

        if (!updatedPayment) {
            throw new Error(`Failed to update payment status for ID ${paymentId}`);
        }

        return updatedPayment;
    }
}
