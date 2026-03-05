import type { PaymentRepository } from "../../../domain/repositories/payment.domain.repository.js";

// Use case to delete a payment record
export class DeleteUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(id: string): Promise<void> {
        const deleted = await this.paymentRepository.delete(id);
        if (!deleted) {
            throw new Error(`Payment with ID ${id} not found`);
        }
    }
}
