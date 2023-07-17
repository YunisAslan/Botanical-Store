import { z } from "zod";

export const productSchema = z.object({
  plant_name: z
    .string()
    .min(2, { message: "Must be at least 2 character" })
    .max(30, { message: "Must be at most 30 characters" }),
  description: z
    .string()
    .max(200, { message: "Must be at most 200 characters" })
    .optional(),
  plant_category: z.enum(["cactus", "aloe", "rose", "orchids", "xerophytes"]),
  plant_price: z.number().min(0.01, "Must be a valid price"),
});
