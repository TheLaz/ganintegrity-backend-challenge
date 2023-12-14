import { z } from "zod";

export const addressSchema = z.object({
  guid: z.string(),
  isActive: z.boolean(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  tags: z.string().array(),
});

export type Address = z.infer<typeof addressSchema>;