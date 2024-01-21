import { cn } from "@/lib/utils";
import Link from "next/link";
import { Movie } from "~/types/tmdb-type";
import { ImageNotFound, NextImage } from "../next-image";
import { imgUrl } from "~/constants/movie";

const AnimeWeekly = ({ bannerAnime }: { bannerAnime: Movie[] | undefined }) => {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
      {bannerAnime?.map((tv, index) => (
        <li
          key={tv.id}
          className={cn(
            "text-gray-400",
            index === 0 && "md:col-span-2 xl:col-span-1",
          )}
        >
          <Link
            href={`/tv/${tv.id}`}
            target="_blank"
            className="transition-colors duration-200 hover:text-white focus:text-white"
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
                  <div className="absolute bottom-0 flex items-center justify-center">
                    <h2 className="m-3 flex h-5 w-5 items-center justify-center rounded-md border bg-white/80 p-5 text-sm font-semibold text-black">
                      {index + 1}
                    </h2>
                    <h3 className="flex flex-wrap text-base leading-5">
                      {tv.name}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center gap-1">
                <h2 className="m-3 flex h-5 w-5 items-center justify-center rounded-md border p-5 text-sm font-semibold">
                  {index + 1}
                </h2>
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
                <h3 className="ml-1.5 flex flex-wrap place-self-start py-1 text-base leading-5">
                  {tv.name}
                </h3>
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AnimeWeekly;
