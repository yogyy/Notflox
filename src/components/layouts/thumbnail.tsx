import Link from 'next/link';
import * as React from 'react';
import { useAtom } from 'jotai';
import { Movie } from '~/typing';
import { cn } from '@/lib/utils';
import NextImage from '../next-image';
import { imgUrl } from '~/constants/movie';
import { type VariantProps, cva } from 'class-variance-authority';
import { changeModalState, changeMovieState } from '~/atoms/jotaiAtoms';

export interface ThumbnailProps<T>
  extends React.HTMLAttributes<T>,
    VariantProps<typeof thumbnailVariants> {
  movie: Movie;
}

const thumbnailVariants = cva(
  'relative min-w-full bg-zinc-800 rounded h-full',
  {
    variants: {
      variant: {
        portrait: 'aspect-poster w-[92px]',
        landscape: 'aspect-video w-[96.43px]',
      },
    },
    defaultVariants: {
      variant: 'portrait',
    },
  }
);

export function ThumbnailTrailer({
  movie,
  variant,
  className,
}: ThumbnailProps<HTMLButtonElement>) {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [, setShowModal] = useAtom(changeModalState);

  const thumbnailUrl =
    variant === 'portrait'
      ? `${imgUrl}/w220_and_h330_bestv2${movie.poster_path}`
      : `${imgUrl}/w500/${movie.backdrop_path}`;

  return (
    <div
      className={cn(
        thumbnailVariants({ variant }),
        "bg-zinc-800 transition duration-300 hover:bg-ireng group-focus-visible:bg-ireng",
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
    </button>
  );
}

export function ThumbnailToPage({
  movie,
  variant,
  className,
}: ThumbnailProps<HTMLAnchorElement>) {
  const thumbnailUrl =
    variant === 'portrait'
      ? `${imgUrl}/w220_and_h330_bestv2${movie.poster_path}`
      : `${imgUrl}/w500${movie.backdrop_path}`;

  return (
    <Link
      href={`/${movie?.release_date ? 'movie' : 'tv'}/${movie?.id}`}
      title={movie.name || movie.title}
      className="w-full rounded">
      <div className={cn(thumbnailVariants({ variant, className }))}>
        <NextImage
          src={thumbnailUrl}
          className="object-fill rounded-sm md:rounded"
          alt={`thumbnail ${movie.name || movie.title}`}
        />
      </div>
    </Link>
  );
}
