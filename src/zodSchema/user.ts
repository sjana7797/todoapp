import { z } from "zod";

export const UserZodSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof UserZodSchema>;
