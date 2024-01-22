import { fetcher } from "../lib/utils";
import { Movie, MovieResponse } from "~/types/tmdb-type";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useCustomQuery(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<Movie[], Error>,
) {
  return useQuery<Movie[], Error>(
    queryKey,
    async () => await fetcher<MovieResponse>(url).then((res) => res.results),
    {
      ...options,
    },
  );
}
