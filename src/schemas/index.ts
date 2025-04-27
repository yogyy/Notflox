import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Your password must contain between 4 and 60 characters.",
  }),
  username: z.optional(z.string()),
  code: z.optional(z.string()),
});
