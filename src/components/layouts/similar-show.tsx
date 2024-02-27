import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Paginate } from "./paginate";
import { Movie } from "~/types/tmdb-type";
import Link from "next/link";
import { cn, convertGenreIdsToNames } from "@/lib/utils";
import { ImageNotFound, NextImage } from "../next-image";
import { tanggal } from "@/lib/get-date";
import { imgUrl } from "~/constants/movie";

interface SimilarProps {
  similar: number;
  type: string;
}
export const SimilarShow = ({ similar, type }: SimilarProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const postPerPage = 6;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const { data, isLoading } = useQuery<Movie[]>(
    [`similar ${type}`, similar],
    () =>
      axios
        .get(`/api/${type}/recommend/${similar}`)
        .then((res) => res.data.results),
  );
  const movies = data?.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [similar]);

  if (isLoading) {
    return (
      <div className="pb-5">
        <p className="mx-4 mb-5 text-xl font-semibold text-[#fcfbfb]">
          Recommendations
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="frounded-sm mx-4 mt-1 flex-col">
              <div className="mb-3 mt-2 h-4 w-32 animate-pulse bg-[#1c1c1c]"></div>
              <div className="flex">
                <div className="relative mr-1.5 aspect-[9/14] h-[150px] w-24 animate-pulse rounded bg-[#1c1c1c] md:h-[249px] md:w-40"></div>
                <div className="flex w-full flex-col gap-2">
                  <div className="h-3 w-full animate-pulse bg-[#1c1c1c]" />
                  <div className="h-3 w-full animate-pulse bg-[#1c1c1c]" />
                  <div className="h-3 w-5/6 animate-pulse bg-[#1c1c1c]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data?.length === 0 || !data) {
    return (
      <div className="h-40">
        <h1 className="text-1xl px-3">Recommendations not available</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <section className={cn("relative mx-4 h-auto space-y-0.5 md:space-y-2")}>
        <span id="similar-show" className="absolute -mt-16 md:-mt-20" />
        <h2 className="mb-5 text-xl font-semibold text-[#fcfbfb]">
          Recommendations
        </h2>
        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2">
          <>
            {movies?.map((movie) => (
              <article key={movie.id} className="group flex flex-col">
                <Link
                  href={`/${movie.media_type == "movie" ? "movie" : "tv"}/${
                    movie.id
                  }`}
                  className="w-fit"
                >
                  <h1 className="text-xl transition duration-200 group-hover:text-red-400">
                    {movie.title || movie.name}
                  </h1>
                </Link>
                <div className="relative flex flex-col text-[10px] text-gray-300 sm:flex-row sm:gap-2">
                  <span className="inline-flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {tanggal(movie.release_date || movie.first_air_date)}
                  </span>
                  <span className="inline-flex cursor-pointer gap-1 hover:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      />
                    </svg>
                    {convertGenreIdsToNames(movie.genre_ids, movie)}
                  </span>
                </div>
                <>
                  <div className="flex max-h-[150px] gap-2 md:max-h-[249px]">
                    <Link
                      href={`/${movie.media_type == "movie" ? "movie" : "tv"}/${
                        movie.id
                      }`}
                      className="relative flex aspect-poster w-24 items-center justify-center rounded bg-[#1c1c1c] brightness-75 transition duration-300 group-hover:brightness-100 md:w-40"
                    >
                      {movie.poster_path ? (
                        <NextImage
                          src={`${imgUrl}/w342/${movie.poster_path}`}
                          className="rounded-sm object-cover md:rounded"
                          alt={`poster ${movie.name || movie.title}`}
                        />
                      ) : (
                        <ImageNotFound />
                      )}
                    </Link>
                    <p className="max-h-[150px] flex-1 overflow-y-scroll text-sm text-gray-400 scrollbar-hide md:max-h-[249px]">
                      {movie.overview} <br />
                    </p>
                  </div>
                  <hr className="my-2 border-[#141414]" />
                </>
              </article>
            ))}
          </>
        </div>
      </section>
      <Paginate
        id_href="#similar-show"
        currentPage={currentPage}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        totalPost={data?.length}
        className="pt-1"
      />
    </React.Fragment>
  );
};
