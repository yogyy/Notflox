import { cn } from "@/lib/utils";
import Link from "next/link";
import { ImageNotFound, NextImage } from "@/components/next-image";
import { baseUrl, imgUrl } from "~/constants/movie";
import { useCustomQuery } from "@/hooks/use-custom-query";
import { ComponentProps } from "react";
import { TopAnimeSkeleton } from "@/components/loader/skeleton";

export const TopAnime = ({ className, ...props }: ComponentProps<"ul">) => {
  const { data, isLoading } = useCustomQuery(
    ["top-anime"],
    `${baseUrl}/discover/tv?sort_by=vote_average.desc&vote_count.gte=200&with_keywords=210024&with_original_language=ja|zh`,
  );

  return (
    <div className="xl:sticky xl:top-16">
      <h1 className="py-1 text-center text-xl font-semibold tracking-wide text-primary">
        Top Anime
      </h1>
      {isLoading ? (
        <TopAnimeSkeleton />
      ) : (
        <ul
          className={cn(
            "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1",
            className,
          )}
          {...props}
        >
          {data?.slice(0, 10).map((tv, index) => (
            <li
              key={tv.id}
              className={cn("", index === 0 && "md:col-span-2 xl:col-span-1")}
              title={tv.name}
            >
              <Link
                href={`/tv/${tv.id}`}
                target="_blank"
                className="text-[#ababab] transition-colors duration-200 first:text-foreground/80 hover:text-foreground focus-visible:text-foreground"
              >
                {index === 0 ? (
                  <div className="relative aspect-video h-full max-h-[200px] w-full">
                    <div className="absolute z-0 aspect-video h-auto max-h-[200px] w-full">
                      <NextImage
                        alt={tv.name}
                        className={cn(
                          "z-[-1] rounded object-contain object-center brightness-75",
                          tv.backdrop_path === null && "object-contain",
                        )}
                        src={`${imgUrl}/w500/${tv.backdrop_path || tv.poster_path}`}
                      />
                      <div className="absolute bottom-0 flex w-full items-center justify-start bg-background/50">
                        <span className="m-0 mt-0 flex h-5 w-5 scale-75 items-center justify-center rounded-md border bg-card p-5 text-sm font-semibold text-foreground md:m-1.5 md:scale-100">
                          {index + 1}
                        </span>
                        <p className="mt-1 place-content-center place-self-start truncate text-base leading-5">
                          {tv.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex items-center gap-1">
                    <span className="m-0 flex h-5 w-5 scale-75 items-center justify-center rounded-md border p-5 text-sm font-semibold md:m-1.5 md:scale-100">
                      {index + 1}
                    </span>
                    <div className="relative aspect-poster max-h-[60px] min-w-[46px]">
                      {tv.poster_path ? (
                        <NextImage
                          alt={"poster " + tv.original_name}
                          src={`${imgUrl}/w92${tv.poster_path}`}
                          className="rounded"
                        />
                      ) : (
                        <ImageNotFound className="text-xs" />
                      )}
                    </div>
                    <p className="ml-1.5 place-self-start truncate py-1 text-[15px] leading-5">
                      {tv.name}
                    </p>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
