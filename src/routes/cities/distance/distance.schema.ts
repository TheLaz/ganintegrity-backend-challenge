import { z } from "zod";

export const getDistanceSchema = z.object({
  to: z.string().uuid(),
  from: z.string().uuid(),
});