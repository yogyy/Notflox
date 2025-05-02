import Link from "next/link";
import { useState } from "react";
import { Paginate } from "../paginate";
import { ImageNotFound, NextImage } from "@/components/next-image";
import { MovieResponse } from "~/types/tmdb-type";
import { useQueries } from "@tanstack/react-query";
import { baseUrl, imgUrl } from "~/constants/movie";
import { AnimeAiringLoading } from "@/components/loader";
import { cn, fetcher } from "@/lib/utils";
import { lastYear, sevenDaysAgo, today } from "@/lib/get-date";

interface AiringProps extends React.HTMLAttributes<HTMLDivElement> {}
export const AnimeAiring = ({ className, ...props }: AiringProps) => {
  const queryConfigurations = Array.from({ length: 4 }, (_, page) => ({
    queryKey: ["anime-airing", page + 1],
    queryFn: () => {
      return fetcher<MovieResponse>(
        `${baseUrl}/discover/tv?page=${
          page + 1
        }&sort_by=primary_release_date.desc&first_air_date.gte=${lastYear}&air_date.lte=${today}&air_date.gte=${sevenDaysAgo}&with_genres=16&with_keywords=210024&without_keywords=278823&with_original_language=ja`,
      );
    },
  }));
  const queryResults = useQueries({ queries: queryConfigurations });
  const combinedData = queryResults.map((res) => res.data?.results).flat();
  const isLoading = queryResults.some((res) => res.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 12;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentAiring = combinedData?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className={cn("mx-auto w-full max-w-[948px]", className)} {...props}>
      <div className="w-full py-1">
        <span id="recent-released" className="absolute -mt-16 md:-mt-20" />
        <h1 className="mb-5 text-xl font-semibold tracking-wide text-primary">
          Recent Released
        </h1>
      </div>
      {isLoading ? (
        <AnimeAiringLoading />
      ) : (
        <ul className="moviecard-container relative grid grid-cols-2 place-content-center gap-3 min-[320px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
          {currentAiring?.map((tv) => (
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
                <div className="relative aspect-poster h-full w-full overflow-hidden rounded bg-zinc-800 transition duration-300 ease-out group-focus-within:bg-ireng group-hover:bg-ireng">
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
                  <p className="flex justify-center truncate text-balance text-center text-[14px] leading-4">
                    {tv?.name}
                  </p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && (
        <Paginate
          id_href="#recent-released"
          className="mt-5 pt-1"
          currentPage={currentPage}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          totalPost={combinedData.length}
        />
      )}
    </div>
  );
};
