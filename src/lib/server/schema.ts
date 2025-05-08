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

export const addWatchlistSchema = z.object({
  title: z.string(),
  showId: z.string().regex(/^\d+$/, {
    message: "show id must be a string containing only numbers",
  }),
  mediaType: z.enum(["movie", "tv"]),
  backdropPath: z.string(),
  posterPath: z.string(),
  releaseDate: z.string(),
});

export const slugSchema = z.tuple([
  z.enum(["movie", "tv"]),
  z.string().regex(/^\d+$/, "ID must be a number"),
]);

export const honoSchema = z.object({
  type: z.union([z.literal("tv"), z.literal("movie")]),
  id: z.string().regex(/^\d+$/, "ID must be a number"),
});
