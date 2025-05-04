import RootLayout from "@/components/layouts/layout";
import { SearchShowSkeleton } from "@/components/loader/searching-loader";
import { ImageNotFound, NextImage } from "@/components/next-image";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { imgUrl } from "~/constants/movie";
import { Movie } from "~/types/tmdb-type";

const SearchPage = () => {
  const [query, _] = useQueryState("q");
  const debouncedQuery = useDebounce<string>(query || "", 700);

  const { data, isLoading } = useQuery<Movie[]>(
    [debouncedQuery],
    () => fetch(`/api/search/${query}`).then((res) => res.json()),
    { enabled: !!query && query.length >= 3 },
  );

  return (
    <RootLayout
      title="Search Movie or TV Show"
      description="Search for your favorite movies or TV shows"
    >
      <section className="mx-auto flex max-w-7xl flex-col gap-4 p-3 pb-5 sm:pt-[8%]">
        <h1 className="text-xl text-gray-600">
          Result for: <span className="text-white">{query}</span>
        </h1>
        <div className="w-full">
          {query && query.length >= 3 && isLoading && <SearchShowSkeleton />}
          {data?.length === 0 ? (
            <div className="italic text-primary/70">
              No result found for&nbsp;
              <span className="text-white">{query}</span>
            </div>
          ) : (
            <ul className="moviecard-container relative grid grid-cols-2 gap-y-[4vw] sm:grid-cols-3 lg:grid-cols-4">
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </RootLayout>
  );
};

export default SearchPage;
