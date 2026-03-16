import type { Payment, PaymentStatus } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";

export class GetPaymentsByStatusUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) { }

    async execute(status: PaymentStatus): Promise<Payment[]> {
        return await this.paymentRepository.getByStatus(status);
    }
}
