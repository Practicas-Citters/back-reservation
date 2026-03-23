import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { UserRole } from "../../domain/entities/user.entity.js";

/**
 * Validation schema for creating and updating Users.
 */
export const UserSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, underscores, and hyphens"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().refine((val: string) => {
    const phoneNumber = parsePhoneNumberFromString(val);
    return phoneNumber?.isValid() ?? false;
  }, { message: "Invalid phone number" }),

  // Robust birthDate validation: Format + Logical validity + Must be in the past
  birthDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid format (YYYY-MM-DD)")
    .refine((val) => {
      const parts = val.split('-');
      if (parts.length !== 3) return false;

      const year = parseInt(parts[0]!, 10);
      const month = parseInt(parts[1]!, 10);
      const day = parseInt(parts[2]!, 10);

      const date = new Date(Date.UTC(year, month - 1, day));
      return date.getUTCFullYear() === year &&
        (date.getUTCMonth() + 1) === month &&
        date.getUTCDate() === day;
    }, {
      message: "The date does not exist"
    })
    .refine((val) => {
      const parts = val.split('-');
      const inputDate = new Date(Date.UTC(parseInt(parts[0]!), parseInt(parts[1]!) - 1, parseInt(parts[2]!)));
      const now = new Date();
      const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

      return inputDate < today;
    }, {
      message: "Birth date must be in the past"
    }),

  role: z.nativeEnum(UserRole, { message: "Invalid user role" }).optional(),
  profilePicture: z.string().url("Invalid URL for profile picture").optional().nullable(),
  isPremium: z.boolean().optional(),
  points: z.number().int().min(0, "Points cannot be negative").optional()
});

export type UserInput = z.infer<typeof UserSchema>;
