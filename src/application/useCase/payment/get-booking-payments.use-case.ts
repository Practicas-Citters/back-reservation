import type { Payment } from "../../../domain/entities/payment.entity.js";
import type { PaymentRepository } from "../../../domain/repositories/payment.repository.js";

//caso de uso para obtener todos los pagos de una reserva (findAllByBookingId)


export class GetBookingPaymentsUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async execute(bookingId: string): Promise<Payment[]> {
        return await this.paymentRepository.findAllByBookingId(bookingId);
    }
}