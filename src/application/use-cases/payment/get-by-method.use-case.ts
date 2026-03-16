import type { Payment, PaymentMethod } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";

export class GetPaymentsByMethodUseCase {
    constructor(private readonly paymentRepository: PaymentRepository) { }

    async execute(method: PaymentMethod): Promise<Payment[]> {
        return await this.paymentRepository.getByMethod(method);
    }
}
