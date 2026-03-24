import { z } from "zod";

/**
 * Validation schema for creating and updating Courts.
 */
export const CourtSchema = z.object({
  name: z.string().min(2, "Court name must be at least 2 characters long"),
  description: z.string().min(2, "Description must be at least 2 characters long"),
  image: z.url("Invalid URL for court image"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  pricePerHour: z.number().min(0, "Price per hour cannot be negative"),
  location: z.string().min(2, "Location must be at least 2 characters long"),
  isAvailable: z.boolean().default(true),
  sportId: z.uuid("Sport ID must be a valid UUID"),
  organizationId: z.uuid("Organization ID must be a valid UUID")
});

export type CourtInput = z.infer<typeof CourtSchema>;
