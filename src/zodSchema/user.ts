import { Document } from "mongoose";
import { z } from "zod";

export const UserZodSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
});

export const UserLoginSchema = UserZodSchema.pick({
  email: true,
  password: true,
});

export type UserZodType = z.infer<typeof UserZodSchema>;

export interface User extends Document, UserZodType {}
