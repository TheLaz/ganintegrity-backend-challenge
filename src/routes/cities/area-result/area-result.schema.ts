import { z } from "zod";

export const getAreaResultSchema = z.object({
  city: z.string().uuid(),
})