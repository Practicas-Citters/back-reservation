import { z } from "zod";

/**
 * Validation schema for creating and updating Sports.
 */
export const SportSchema = z.object({
  name: z.string().min(2, "Sport name must be at least 2 characters long"),
  iconUrl: z.url("Invalid URL for sport icon"),
  minPlayers: z.number().int().min(1, "Minimum players must be at least 1"),
  maxPlayers: z.number().int().min(1, "Maximum players must be at least 1")
}).refine((data) => {
  if (data.minPlayers && data.maxPlayers) {
    return data.maxPlayers >= data.minPlayers;
  }
  return true;
}, {
  message: "Maximum players cannot be less than minimum players",
  path: ["maxPlayers"]
});

export type SportInput = z.infer<typeof SportSchema>;
