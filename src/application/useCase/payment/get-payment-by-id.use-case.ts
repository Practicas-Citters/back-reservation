import type { Payment } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";


//caso de uso para obtener un pago por id (findById)


export class GetPaymentByIdUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(paymentId: string): Promise<Payment> {
        const payment = await this.paymentRepository.findById(paymentId);
        
        if (!payment) {
            throw new Error(`Payment with id ${paymentId} not found`);
        }
        
        return payment;
    }
}