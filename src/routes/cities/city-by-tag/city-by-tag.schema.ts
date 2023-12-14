import { z } from "zod";

export const getCitiesByTagSchema = z.object({
  isActive: z.boolean(),
  tag: z.string().min(2, { message: "Tag must be 2 or more characters long" })
});