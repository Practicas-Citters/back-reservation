import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Validation schema for creating and updating Organizations.
 */
export const OrganizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().nullable(),
  email: z.email("Invalid email address"),
  phone: z.string().refine((val: string) => {
    const phoneNumber = parsePhoneNumberFromString(val);
    return phoneNumber?.isValid() ?? false;
  }, { message: "Invalid phone number" }),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  city: z.string().min(2, "City must be at least 2 characters long"),
  zipCode: z.string().min(3, "Zip code must be at least 3 characters long"),
  logo: z.url("Invalid URL for logo").nullable(),
  bannerImage: z.url("Invalid URL for banner image").nullable(),
  isActive: z.boolean().default(true),
  managers: z.array(z.uuid("Manager ID must be a valid UUID")).min(1, "At least one manager is required")
});

export type OrganizationInput = z.infer<typeof OrganizationSchema>;
