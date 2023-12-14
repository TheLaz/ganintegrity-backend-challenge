import { z } from "zod";

export const getAreaResultSchema = z.object({
  cityGuid: z.string().uuid(),
});