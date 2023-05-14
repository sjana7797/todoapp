import { z } from "zod";
import { Operation } from "fast-json-patch";

export const taskZodSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  user: z.string(),
});

export const taskCreateZodSchema = taskZodSchema.pick({
  title: true,
  description: true,
});

export const taskIdZodValidation = z.object({
  id: z.string(),
});
