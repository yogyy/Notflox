import Image from 'next/image';
import { Movie } from '../../../typing';
import * as React from 'react';
import { modalState, movieState } from '../../../atoms/jotaiAtoms';
import { useAtom } from 'jotai';
import clsx from 'clsx';

interface Props {
  movie: Movie;
  className?: string;
}

export function ThumbnailPotrait({ movie, className }: Props) {
  const [currentMovie, setCurrentMovie] = useAtom(movieState);
  const [showModal, setShowModal] = useAtom(modalState);

  return (
    <button
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      title={movie.name || movie.title}
      className="w-full focus:opacity-70 hover:opacity-70"
    >
      <div
        className={clsx(
          'relative aspect-[9/14] min-w-full w-[92px] h-full bg-zinc-900 rounded',
          className
        )}
      >
        {movie ? (
          <Image
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            className="object-cover rounded-sm md:rounded"
            fill
            sizes="100%"
            alt={`Thumbnail ${movie?.name}`}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full rounded-sm bg-zinc-800 animate-pulse md:rounded"></div>
        )}
      </div>
    </button>
  );
}

export function ThumbnailLanscape({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useAtom(movieState);
  const [showModal, setShowModal] = useAtom(modalState);

  return (
    <div className="">
      <button
        // href="/"
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
        }}
        title={movie.name || movie.title}
        className="w-full focus:opacity-70 hover:opacity-70"
      >
        <div className="relative aspect-video min-w-full w-[96.43px] bg-zinc-900 rounded">
          {movie ? (
            <Image
              src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
              className="object-cover rounded-sm md:rounded"
              fill
              sizes="100%"
              alt={`Thumbnail ${movie?.name}`}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full rounded-sm bg-zinc-800 animate-pulse md:rounded"></div>
          )}
        </div>
      </button>
    </div>
  );
}
