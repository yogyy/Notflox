import Link from "next/link";
import * as React from "react";
import { useAtom } from "jotai";
import { Movie } from "~/types/tmdb-type";
import { cn } from "@/lib/utils";
import { ImageNotFound, NextImage } from "../next-image";
import { imgUrl } from "~/constants/movie";
import { type VariantProps, cva } from "class-variance-authority";
import { changeModalState, changeMovieState } from "~/atoms/jotaiAtoms";

export interface ThumbnailProps
  extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
    VariantProps<typeof thumbnailVariants> {
  movie: Movie;
  type: "to-page" | "play";
}

const thumbnailVariants = cva("relative min-w-full rounded h-full", {
  variants: {
    variant: {
      portrait: "aspect-poster w-[92px]",
      landscape: "aspect-video w-[96.43px]",
    },
  },
  defaultVariants: {
    variant: "portrait",
  },
});

const InnerThumbnail = ({
  movie,
  variant,
}: Pick<ThumbnailProps, "variant" | "movie">) => {
  const thumbnailUrl =
    variant === "portrait"
      ? movie.poster_path &&
        `${imgUrl}/w220_and_h330_bestv2${movie.poster_path}`
      : movie.backdrop_path && `${imgUrl}/w500/${movie.backdrop_path}`;

  return (
    <div
      className={cn(
        thumbnailVariants({ variant }),
        "bg-zinc-800 transition duration-300 hover:bg-background group-focus-visible:bg-background",
      )}
    >
      {thumbnailUrl ? (
        <NextImage
          src={thumbnailUrl}
          className="rounded-sm object-fill md:rounded"
          alt={`thumbnail ${movie.name || movie.title}`}
        />
      ) : (
        <ImageNotFound
          className={cn(variant === "portrait" ? "text-base" : "text-xl")}
        />
      )}
    </div>
  );
};
export const Thumbnail = ({
  type,
  movie,
  variant,
  className,
  ...props
}: ThumbnailProps) => {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [, setShowModal] = useAtom(changeModalState);
  return type === "to-page" ? (
    <Link
      href={`/${movie?.release_date ? "movie" : "tv"}/${movie?.id}`}
      title={movie.name || movie.title}
      className={cn("moviecard group w-full rounded outline-none", className)}
      {...props}
    >
      <InnerThumbnail movie={movie} variant={variant} />
    </Link>
  ) : (
    <button
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      title={movie.name || movie.title}
      type="button"
      className={cn("moviecard group w-full rounded outline-none", className)}
      {...props}
    >
      <InnerThumbnail movie={movie} variant={variant} />
    </button>
  );
};
