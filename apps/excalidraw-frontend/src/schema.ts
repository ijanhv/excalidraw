import z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  username: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});