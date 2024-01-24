import { Movie } from "~/types/tmdb-type";
import { cn } from "@/lib/utils";
import { NextImage } from "../next-image";
import { tanggal } from "@/lib/getDate";
import { imgUrl } from "~/constants/movie";
import { ButtonTrailer } from "../button-trailer";

interface DetailProps extends React.ComponentProps<"article"> {
  show: Movie | undefined;
  playFunc: () => void;
}
export const ShowDetails = ({
  show,
  playFunc,
  className,
  ...props
}: DetailProps) => {
  return (
    <article
      className={cn(
        "relative flex flex-col gap-5 px-5 pt-4 sm:items-center",
        "mx-auto max-w-7xl justify-start bg-gradient-to-b from-[#5f5f5f]/20 to-ireng/20",
        "md:-mt-[20%] md:flex-row md:items-start md:bg-none lg:-mt-[40%]",
        className,
      )}
      {...props}
    >
      <div className="-mt-14 flex flex-col gap-3 min-[300px]:flex-row sm:mt-0 sm:block">
        <div className="relative h-full gap-3 md:flex md:flex-col">
          <div className="relative aspect-[27/40] w-32 rounded sm:-mt-32 sm:w-40 md:mt-0 ">
            <NextImage
              src={`${imgUrl}/w220_and_h330_bestv2${show?.poster_path}`}
              className="rounded-sm object-cover md:rounded"
              alt={`${show?.name || show?.title} poster`}
              fetchPriority="auto"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-3 text-sm sm:mt-3">
          <span className="font-mono text-base sm:hidden md:text-3xl">
            {show?.tagline}
          </span>
          <ButtonTrailer
            onClick={playFunc}
            title={`Play ${show?.name || show?.title} Trailer`}
            className="w-32 sm:w-40"
            type="button"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="border-b border-zinc-800/25 pb-2">
          <h1 className="text-xl font-semibold text-red-600">
            {show?.name || show?.title}&nbsp;
            <span className="text-gray-300">
              (
              {show?.first_air_date?.slice(0, 4) ||
                show?.release_date?.slice(0, 4)}
              )
            </span>
          </h1>
          <h2 className="text-gray-500">
            {show?.original_name || show?.original_title}
          </h2>
          <p className="text-sm text-gray-400 lg:text-base">{show?.overview}</p>
        </div>
        <div className="mt-3 border-b border-zinc-800/25 pb-2 text-sm text-gray-300">
          <p className="text-inherit">
            Aired : {tanggal(show?.first_air_date || show?.release_date)}
            {show?.first_air_date && (
              <span>&nbsp;to {tanggal(show?.last_air_date || "?")}</span>
            )}
          </p>
          <p className="text-inherit">Status : {show?.status}</p>
          <p className="text-inherit">
            Genre :&nbsp;
            <span className="text-red-300">
              {show?.genres.map((genre) => genre.name).join(", ")}
            </span>
          </p>
          <p className="text-inherit">
            <span className="">Rating :&nbsp;</span>
            {show?.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-sm text-inherit">
            Studio :&nbsp;
            {show?.production_companies.map((studio) => studio.name).join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
};
