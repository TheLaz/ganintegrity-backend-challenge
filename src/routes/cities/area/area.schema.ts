import { z } from "zod";

export const getAreaSchema = z.object({
  from: z.string().uuid(),
  timeout: z.number().nonnegative(),
  distance: z.number().nonnegative(),
})