import { z } from "zod";

export const showSchema = z.object({
  id: z.string().regex(/^\d+$/, {
    message: "show id must be a string containing only numbers",
  }),
});

export const searchSchema = z.object({
  query: z.string().min(3, {
    message: "query must be at least 3 characters long",
  }),
});
