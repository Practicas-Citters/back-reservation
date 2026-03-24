import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";
import { PaymentStatus, Payment } from "../../../domain/entities/payment.entity.js";

interface UpdatePaymentInput {
    id: string;
    status?: PaymentStatus | undefined;
    transactionId?: string | null | undefined;
}

// Use case to update payment status and transaction information
export class UpdatePaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(input: UpdatePaymentInput): Promise<Payment> {
        const updates: any = {};
        if (input.status) updates.status = input.status;
        if (input.transactionId) updates.transactionId = input.transactionId;

        const updatedPayment = await this.paymentRepository.update(input.id, updates);

        if (!updatedPayment) {
            throw new Error(`Payment with ID ${input.id} not found`);
        }

        return updatedPayment;
    }
}
