import Image from 'next/image';
import * as React from 'react';
import Link from 'next/link';
import { Movie } from '../../../typing';

interface Props {
  movie: Movie;
}

export function ThumbnailPotrait({ movie }: Props) {
  return (
    <Link
      href={`/${movie?.release_date ? 'movie' : 'tv'}/${movie?.id}`}
      title={movie.name || movie.title}
      className="focus:opacity-70 hover:opacity-70"
    >
      <div className="relative aspect-[9/14] min-w-full w-[92px] h-full bg-zinc-900 rounded">
        <Image
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          className="object-cover rounded-sm md:rounded"
          fill
          sizes="100%"
          alt={`Thumbnail ${movie.name || movie.title}`}
          draggable={false}
        />
      </div>
    </Link>
  );
}

export function ThumbnailLanscape({ movie }: Props) {
  return (
    <div className="">
      <Link
        href={`/${movie?.media_type === 'movie' ? 'movie' : 'tv'}/${movie?.id}`}
        title={movie.name || movie.title}
        className="w-full focus:opacity-70 hover:opacity-70"
      >
        <div className="relative aspect-video min-w-full w-[96.43px] bg-zinc-900 rounded">
          <Image
            src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
            className="object-cover rounded-sm md:rounded"
            fill
            sizes="100%"
            alt={`Thumbnail ${movie.name || movie.title}`}
            draggable={false}
          />
        </div>
      </Link>
    </div>
  );
}
