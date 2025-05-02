import { cn } from "@/lib/utils";
import Link from "next/link";
import { Movie } from "~/types/tmdb-type";
import { ImageNotFound, NextImage } from "@/components/next-image";
import { imgUrl } from "~/constants/movie";

interface WeeklyAnimeProps extends React.HTMLAttributes<HTMLUListElement> {
  anime: Movie[] | undefined;
}
export const AnimeWeekly = ({
  anime,
  className,
  ...props
}: WeeklyAnimeProps) => {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1",
        className,
      )}
      {...props}
    >
      {anime?.map((tv, index) => (
        <li
          key={tv.id}
          className={cn("", index === 0 && "md:col-span-2 xl:col-span-1")}
        >
          <Link
            href={`/tv/${tv.id}`}
            target="_blank"
            className="text-[#ababab] transition-colors duration-200 hover:text-accent focus-visible:text-accent"
          >
            {index === 0 ? (
              <div className="relative aspect-video h-full max-h-[200px] w-full">
                <div className="absolute z-0 aspect-video h-auto max-h-[200px] w-full">
                  <NextImage
                    alt={tv.name}
                    className={cn(
                      "z-[-1] rounded object-center brightness-75",
                      tv.backdrop_path === null && "object-contain",
                    )}
                    src={`${imgUrl}/w500/${tv.backdrop_path || tv.poster_path}`}
                  />
                  <div className="absolute bottom-0 flex w-full items-center justify-start bg-ireng/50">
                    <span className="m-1.5 flex h-5 w-5 items-center justify-center rounded-md border bg-accent p-5 text-sm font-semibold text-black">
                      {index + 1}
                    </span>
                    <p className="flex flex-wrap text-base leading-5">
                      {tv.name}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center gap-1">
                <span className="m-1.5 flex h-5 w-5 items-center justify-center rounded-md border p-5 text-sm font-semibold">
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
  );
};
