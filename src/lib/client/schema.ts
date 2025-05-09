import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(1, {
    message: "Your password must contain between 4 and 60 characters.",
  }),
  username: z.string().min(7, {
    message: "username must contain between 7 and 20 characters.",
  }),
});
