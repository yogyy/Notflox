import Link from "next/link";
import { ImageNotFound, NextImage } from "./next-image";
import { Watchlist } from "@/db/type";
import { getImageUrl } from "@/lib/utils";

interface WatchlistProps {
  data: Watchlist[];
}
export const UserWatchlist = ({ data }: WatchlistProps) => {
  if (data.length === 0) {
    return (
      <p className="italic text-foreground/80">
        Your watchlist is currently empty. Start adding your favorite shows!
      </p>
    );
  }
  return (
    <ul className="moviecard-container relative mt-6 grid grid-cols-2 gap-x-1 gap-y-[4vw] min-[460px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
      {data?.map((show) => {
        const showTitle = show.title;
        return (
          <li
            key={show?.id}
            className="moviecard group relative overflow-hidden px-[.2vw]"
            title={showTitle}
          >
            <Link
              href={`/${show?.mediaType}/${show?.showId}`}
              aria-label={show?.title}
              className="w-full outline-none"
            >
              <div className="relative aspect-poster overflow-hidden rounded bg-zinc-800 transition duration-300 ease-out group-focus-within:bg-background group-hover:bg-background">
                {show.posterPath ? (
                  <NextImage
                    src={getImageUrl({
                      size: "portrait",
                      path: show.posterPath,
                    })}
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
  );
};
