import { z } from "zod";
import { PaymentStatus, PaymentMethod } from "../../domain/entities/payment.entity.js";

/**
 * Validation schema for creating and updating Payments.
 */
export const PaymentSchema = z.object({
  amount: z.number()
    .positive("Amount must be greater than zero")
    .multipleOf(0.01, "Amount can have at most 2 decimal places"),
  method: z.enum(PaymentMethod, { message: "Invalid payment method" }),
  userId: z.uuid("Invalid user ID format"),
  bookingId: z.uuid("Invalid booking ID format"),
  status: z.enum(PaymentStatus, { message: "Invalid payment status" }).optional(),
  transactionId: z.string().min(1, "Transaction ID cannot be empty").optional().nullable(),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;

/**
 * Helper schema for partial updates (e.g., status or transactionId)
 */
export const PaymentUpdateSchema = PaymentSchema.partial().omit({ amount: true, userId: true, bookingId: true });
