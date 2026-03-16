import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";
import { PaymentStatus, Payment } from "../../../domain/entities/payment.entity.js";

// Use case to process payment refunds
export class RefundPaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.getById(id);

        if (!payment) {
            throw new Error(`Payment with ID ${id} not found`);
        }

        if (payment.status !== PaymentStatus.COMPLETED) {
            throw new Error(`Only completed payments can be refunded. Current status: ${payment.status}`);
        }

        const updatedPayment = await this.paymentRepository.update(id, {
            status: PaymentStatus.REFUNDED
        });

        if (!updatedPayment) {
            throw new Error(`Failed to update payment status for ID ${id}`);
        }

        return updatedPayment;
    }
}
