import Image from 'next/image';
import { Genre, Movie } from '../../../typing';
import { ClockIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { useRecoilState } from 'recoil';

interface Props {
  movie: Movie;
}

export function ThumbnailPotrait({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className="cursor-pointer transition duration-200 ease-out hover:brightness-75 w-full h-full"
    >
      <div className="relative aspect-[9/14] w-[92px] md:w-[164px] h-full bg-zinc-900 rounded">
        <Image
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          className="rounded-sm object-cover md:rounded"
          fill
          sizes="100%"
          alt={`Thumbnail ${movie?.name}`}
          draggable={false}
        />
      </div>
    </div>
  );
}

export function ThumbnailLanscape({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className={`relative aspect-video h-[150px] xl:h-[225px] cursor-pointer transition duration-200 ease-out hover:brightness-75`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
        className="rounded-sm object-cover md:rounded bg-cover"
        fill
        sizes="100%"
        alt={`Thumbnail ${movie?.name}`}
        draggable={false}
      />
    </div>
  );
}
