import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { imgUrl, genreMovie, genreTv } from "~/constants/movie";
import axios, { AxiosRequestConfig } from "axios";
import { Movie } from "~/types/tmdb-type";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ImageVariant = "portrait" | "lanscape";
export function getImageUrl({
  size,
  path,
}: {
  size: ImageVariant;
  path: string | null | undefined;
}) {
  const width = size === "portrait" ? 220 : 300;
  const height = size === "portrait" ? 330 : 450;
  return `${imgUrl}/w${width}_and_h${height}_bestv2${path}`;
}

export async function fetcher<T>(
  endpoint: string,
  options?: AxiosRequestConfig,
): Promise<T> {
  const response = await axios.get(endpoint, {
    ...options,
    method: "GET",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    },
  });

  return await response.data;
}

export const convertGenreIdsToNames = (genreIds: number[], movie: Movie) => {
  const genreNames = genreIds.map((genreId: number) => {
    const matchingGenre = (
      movie.media_type === "tv" ? genreTv : genreMovie
    ).find((genre) => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : "";
  });
  return genreNames.join(", ");
};
