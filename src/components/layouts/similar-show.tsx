import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Genre, MovieResponse } from "~/types/tmdb-type";
import Link from "next/link";
import { convertGenreIdsToNames, fetcher } from "@/lib/utils";
import { ImageNotFound, NextImage } from "../next-image";
import { tanggal } from "@/lib/get-date";
import { baseUrl, imgUrl } from "~/constants/movie";
import { ClockIcon, FolderIcon } from "../icons/general";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SimilarShowSkeleton } from "../loader/skeleton";

interface SimilarProps {
  showId: number;
  genres: Genre[];
  type: "movie" | "tv";
}

export const SimilarShow = ({ showId, type, genres }: SimilarProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * 4;
  const firstPostIndex = lastPostIndex - 4;
  const genreIds = genres.map((i) => i.id).join();

  const { data, isLoading, error } = useQuery([`similar-${type}`, showId], () =>
    fetcher<MovieResponse>(`${baseUrl}/discover/${type}?with_genres=${genreIds}`),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [showId, type]);

  if ((!isLoading && !data) || error) {
    return (
      <div className="h-40">
        <h1 className="text-1xl px-3">
          Similar <span className="capitalize">{type}</span> not found
        </h1>
      </div>
    );
  }

  const similar = data?.results
    .filter((i) => i.id !== showId)
    .slice(firstPostIndex, lastPostIndex);

  return (
    <section>
      <div className="relative mx-4 h-auto space-y-0.5 md:space-y-2">
        <h2
          id="similar-show"
          className="mb-5 scroll-mt-20 text-xl font-medium text-[#fcfbfb]"
        >
          Similar Show
        </h2>
        {isLoading && <SimilarShowSkeleton />}
        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2">
          {similar?.map((show) => (
            <article key={show.id} className="group flex flex-col">
              <Link href={`/${type}/${show.id}`} className="w-fit">
                <h1 className="text-xl transition duration-200 group-hover:text-red-400">
                  {show.title || show.name}
                </h1>
              </Link>
              <div className="relative flex flex-col text-[10px] text-gray-300 sm:flex-row sm:gap-2">
                <span className="inline-flex gap-1">
                  <ClockIcon />
                  {tanggal(show.release_date || show.first_air_date)}
                </span>
                <span className="inline-flex cursor-pointer gap-1 hover:text-gray-300">
                  <FolderIcon />
                  {convertGenreIdsToNames(show.genre_ids, type)}
                </span>
              </div>
              <div className="flex max-h-[150px] gap-2 md:max-h-[249px]">
                <Link
                  href={`/${type}/${show.id}`}
                  className="relative flex aspect-poster w-24 items-center justify-center rounded bg-[#1c1c1c] brightness-75 transition duration-300 group-hover:brightness-100 md:w-40"
                >
                  {show.poster_path ? (
                    <NextImage
                      src={`${imgUrl}/w342/${show.poster_path}`}
                      className="rounded-sm object-cover md:rounded"
                      alt={`poster ${show.name || show.title}`}
                    />
                  ) : (
                    <ImageNotFound />
                  )}
                </Link>
                <p className="max-h-[150px] flex-1 overflow-y-scroll text-balance text-sm text-gray-400 scrollbar-hide md:max-h-[249px]">
                  {show.overview} <br />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Pagination className="mt-2 w-full scale-90 overflow-hidden overflow-x-scroll pb-2 pt-1 scrollbar-hide md:scale-100">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#similar-show"
              className={
                currentPage > 1
                  ? "focus-visible:ring-primary"
                  : "pointer-events-none opacity-50 focus-visible:ring-0"
              }
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
            />
          </PaginationItem>
          {[1, 2, 3, 4, 5].map((curr) => (
            <PaginationItem key={curr}>
              <PaginationLink
                href="#similar-show"
                isActive={curr === currentPage}
                onClick={() => setCurrentPage(curr)}
                className="focus-visible:ring-primary"
              >
                {curr}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={
                currentPage < 5 && !isLoading && data.total_pages > 5
                  ? "focus-visible:ring-primary"
                  : "pointer-events-none opacity-50 focus-visible:ring-0"
              }
              href="#similar-show"
              onClick={() => {
                if (currentPage < 5 && !isLoading && data.total_pages > 5) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};
