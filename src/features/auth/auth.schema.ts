import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
