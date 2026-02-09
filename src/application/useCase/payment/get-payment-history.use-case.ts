import type { Payment } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";

export class GetPaymentHistoryUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(userId: string): Promise<Payment[]> {
        return await this.paymentRepository.findAllByUserId(userId);
    }
}
