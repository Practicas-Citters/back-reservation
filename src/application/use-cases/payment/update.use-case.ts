import type { PaymentRepository } from "../../../domain/repositories/payment.domain.repository.js";
import { PaymentStatus, Payment } from "../../../domain/entities/payment.entity.js";

interface UpdatePaymentInput {
    id: string;
    status?: PaymentStatus;
    transactionId?: string;
}

// Use case to update payment status and transaction information
export class UpdateUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(input: UpdatePaymentInput): Promise<Payment> {
        const { id, status, transactionId } = input;

        const updates: Partial<Pick<Payment, 'status' | 'transactionId'>> = {};

        if (status !== undefined) updates.status = status;
        if (transactionId !== undefined) updates.transactionId = transactionId;

        // Validation: Ensure there's at least one field to update
        if (Object.keys(updates).length === 0) {
            throw new Error("No fields provided for update");
        }

        const updatedPayment = await this.paymentRepository.update(id, updates);

        if (!updatedPayment) {
            throw new Error(`Payment with ID ${input.id} not found`);
        }

        return updatedPayment;
    }
}
