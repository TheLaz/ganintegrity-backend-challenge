import { z } from "zod";

export const getAreaSchema = z.object({
  from: z.string().uuid(),
  distance: z.number().nonnegative(),
})