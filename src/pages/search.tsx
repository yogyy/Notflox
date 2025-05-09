import RootLayout from "@/components/layouts/layout";
import { ImageNotFound, NextImage } from "@/components/next-image";
import { useDebounce } from "@/hooks/use-debounce";
import { authClient } from "@/lib/auth-client";
import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { baseUrl, imgUrl } from "~/constants/movie";
import { Movie, MovieResponse } from "~/types/tmdb-type";

const SearchPage = () => {
  const [query, _] = useQueryState("q");
  const debouncedQuery = useDebounce<string>(query || "", 700);
  const { data: session } = authClient.useSession();

  const { data, isLoading } = useQuery(
    [debouncedQuery],
    () =>
      fetcher<MovieResponse>(`${baseUrl}/search/multi?query=${query}`).then((res) =>
        res.results.filter(
          (result: Movie) =>
            (result.media_type === "movie" || result.media_type === "tv") &&
            result.release_date !== "",
        ),
      ),
    { enabled: !!query && query.length >= 3 && !!session },
  );

  return (
    <RootLayout
      title="Search Movie or TV Show"
      description="Search for your favorite movies or TV shows"
    >
      <section className="mx-auto flex max-w-7xl flex-col gap-4 p-3 pb-5 sm:pt-[8%]">
        {!session ? (
          <h1 className="mt-20 text-xl text-foreground">
            <Link href="/auth" className="text-primary">
              Login
            </Link>{" "}
            to start Searching a movie / tv show
          </h1>
        ) : (
          <>
            <h1 className="text-xl text-gray-600">
              Result for: <span className="text-white">{query}</span>
            </h1>
            <div className="w-full">
              {query && query.length >= 3 && isLoading && (
                <ul className="relative grid grid-cols-2 gap-y-[4vw] sm:grid-cols-3 lg:grid-cols-4">
                  {[...Array(12)].map((_, index) => (
                    <li key={index} className="relative w-full  px-[.2vw]">
                      <div className="aspect-video min-h-16 w-full animate-pulse rounded bg-zinc-800"></div>
                      <p className="mx-0.5 mt-0.5 h-4 w-1/2 bg-foreground"></p>
                    </li>
                  ))}
                </ul>
              )}
              {data?.length === 0 ? (
                <div className="italic text-primary/70">
                  No result found for&nbsp;
                  <span className="text-white">{query}</span>
                </div>
              ) : (
                <ul
                  key={debouncedQuery}
                  className="moviecard-container relative grid grid-cols-2 gap-y-[4vw] sm:grid-cols-3 lg:grid-cols-4"
                >
                  {data?.map((show) => {
                    const showTitle = show.title || show?.name;
                    return (
                      <li
                        key={show?.id}
                        className="moviecard group relative overflow-hidden px-[.2vw]"
                        aria-label={showTitle}
                      >
                        <Link
                          href={`/${show?.media_type}/${show?.id}`}
                          aria-label={show?.name || show?.title}
                          className="min-h-16 w-full outline-none"
                        >
                          <div className="relative aspect-video w-auto overflow-hidden rounded bg-zinc-800 transition duration-300 ease-out group-focus-within:bg-background group-hover:bg-background">
                            {show?.backdrop_path || show.poster_path ? (
                              <NextImage
                                src={
                                  show?.backdrop_path
                                    ? `${imgUrl}/w500${show?.backdrop_path}`
                                    : `${imgUrl}/w220_and_h330_bestv2${show?.poster_path}`
                                }
                                alt={showTitle}
                              />
                            ) : (
                              <ImageNotFound message="Cover not Available" />
                            )}
                          </div>
                          <p className="truncate p-0.5 text-[14px] leading-4">
                            {show.title || show.name}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </section>
    </RootLayout>
  );
};

export default SearchPage;
