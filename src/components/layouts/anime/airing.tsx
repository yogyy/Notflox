import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageNotFound, NextImage } from "@/components/next-image";
import { MovieResponse } from "~/types/tmdb-type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, imgUrl } from "~/constants/movie";
import { AiringAnimeSkeleton } from "@/components/loader/skeleton";
import { cn, fetcher } from "@/lib/utils";
import { today } from "@/lib/get-date";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AiringProps extends React.HTMLAttributes<HTMLDivElement> {}

const fetchAiringAnime = async (page: number): Promise<MovieResponse> => {
  return fetcher(
    `${baseUrl}/discover/tv?page=${page}&sort_by=first_air_date.desc&first_air_date.lte=${today}&with_keywords=210024&with_original_language=ja|zh`,
  );
};

export const AiringAnime = ({ className, ...props }: AiringProps) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["anime-airing", page],
    queryFn: () => fetchAiringAnime(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.page! < data?.total_pages!) {
      queryClient.prefetchQuery({
        queryKey: ["anime-airing", page],
        queryFn: () => fetchAiringAnime(page),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return (
    <div className={cn("mx-auto w-full max-w-[948px]", className)} {...props}>
      <div id="recent-released" className="w-full scroll-mt-20 py-1">
        <h1 className="mb-5 text-xl font-semibold tracking-wide text-primary">
          Recent Released
        </h1>
      </div>
      {isLoading ? (
        <AiringAnimeSkeleton />
      ) : (
        <ul className="moviecard-container relative grid grid-cols-2 place-content-center gap-3 min-[320px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
          {data?.results.map((tv) => (
            <li
              key={tv?.id}
              className="moviecard group relative overflow-hidden"
              aria-label={tv?.name}
            >
              <Link
                href={`/tv/${tv?.id}`}
                aria-label={tv?.name || tv?.title}
                className="relative flex aspect-poster h-auto w-auto flex-col gap-0.5 outline-none"
              >
                <div className="relative aspect-poster h-full w-full overflow-hidden rounded bg-zinc-800 transition duration-300 ease-out group-focus-within:bg-background group-hover:bg-background">
                  {tv?.poster_path ? (
                    <NextImage
                      src={`${imgUrl}/w220_and_h330_bestv2${tv?.poster_path}`}
                      alt={`thumbnail ${tv?.name}`}
                    />
                  ) : (
                    <ImageNotFound />
                  )}
                </div>
                <span className="max-h-8 w-full text-pretty text-[#ababab] transition duration-200 group-focus-within:text-white group-hover:text-white">
                  <p className="truncate text-center text-[14px] leading-4">{tv?.name}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        className={cn(
          "mt-2 w-full scale-90 overflow-hidden overflow-x-scroll pb-2 pt-1 scrollbar-hide md:scale-100",
          className,
        )}
        {...props}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#recent-released"
              className={
                page > 1
                  ? "focus-visible:ring-primary"
                  : "pointer-events-none opacity-50 focus-visible:ring-0"
              }
              onClick={() => {
                if (page > 1) {
                  setPage((prev) => prev - 1);
                }
              }}
            />
          </PaginationItem>
          {[1, 2, 3, 4].map((curr) => (
            <PaginationItem key={curr}>
              <PaginationLink
                href="#recent-released"
                isActive={curr === page}
                onClick={() => setPage(curr)}
                className="focus-visible:ring-primary"
              >
                {curr}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={
                page < 4
                  ? "focus-visible:ring-primary"
                  : "pointer-events-none opacity-50 focus-visible:ring-0"
              }
              href="#recent-released"
              onClick={() => {
                if (page < 4) {
                  setPage((prev) => prev + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
