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
      className="cursor-pointer transition duration-200 ease-out hover:brightness-75 w-full h-full p-0.5"
    >
      <div className="relative aspect-[9/14] w-[92px] md:w-[164px] h-full bg-zinc-900 rounded">
        <Image
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          className="rounded-sm object-cover md:rounded"
          fill
          sizes="100%"
          alt={`Thumbnail ${movie?.name}`}
          draggable={false}
          onClick={() => console.log(movie)}
        />
      </div>
    </Link>
  );
}

export function ThumbnailLanscape({ movie }: Props) {
  return (
    <Link
      href={`/${movie?.media_type === 'movie' ? 'movie' : 'tv'}/${movie?.id}`}
    >
      <div className="relative aspect-video h-[150px] xl:h-[225px]">
        <Image
          src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
          className="rounded-sm object-cover md:rounded bg-cover"
          fill
          sizes="100%"
          alt={`Thumbnail ${movie?.name}`}
          draggable={false}
          onClick={() => console.log(movie)}
        />
      </div>
    </Link>
  );
}
