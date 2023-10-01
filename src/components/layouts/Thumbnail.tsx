import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '~/typing';
import { changeModalState, changeMovieState } from '~/atoms/jotaiAtoms';
import { useAtom } from 'jotai';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export interface ThumbnailProps<T>
  extends React.HTMLAttributes<T>,
    VariantProps<typeof thumbnailVariants> {
  movie: Movie;
}

const thumbnailVariants = cva(
  'relative min-w-full bg-zinc-900 rounded h-full',
  {
    variants: {
      variant: {
        portrait: 'aspect-[27/40] w-[92px]',
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
      ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
      : `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`;

  return (
    <button
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      title={movie.name || movie.title}
      className="w-full brightness-90 focus:brightness-110 hover:brightness-110 transition duration-200">
      <div className={cn(thumbnailVariants({ variant, className }))}>
        <Image
          src={thumbnailUrl}
          className="object-center rounded-sm md:rounded"
          fill
          sizes="100%"
          alt={`thumbnail ${movie?.name}`}
          draggable={false}
        />
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
      ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
      : `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`;

  return (
    <Link
      href={`/${movie?.release_date ? 'movie' : 'tv'}/${movie?.id}`}
      title={movie.name || movie.title}
      className="w-full brightness-90 focus:brightness-110 hover:brightness-110 transition duration-200">
      <div className={cn(thumbnailVariants({ variant, className }))}>
        <Image
          src={thumbnailUrl}
          className="object-center rounded-sm md:rounded"
          fill
          sizes="100%"
          alt={`thumbnail ${movie.name || movie.title}`}
          draggable={false}
        />
      </div>
    </Link>
  );
}
