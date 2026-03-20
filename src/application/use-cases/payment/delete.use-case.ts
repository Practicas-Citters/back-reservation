import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";

// Use case to delete a payment record
export class DeletePaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(id: string): Promise<void> {
        const payment = await this.paymentRepository.getById(id);
        if (!payment) {
            throw new Error(`Payment with ID ${id} not found`);
        }
        await this.paymentRepository.delete(id);
    }
}
