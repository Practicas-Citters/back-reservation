import type { Payment } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";


// Use case to retrieve a payment by its ID (findById)


export class GetPaymentByIdUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(id: string): Promise<Payment> {
        const payment = await this.paymentRepository.getById(id);

        if (!payment) {
            throw new Error(`Payment with id ${id} not found`);
        }

        return payment;
    }
}