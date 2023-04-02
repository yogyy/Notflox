import Image from 'next/image';
import { Movie } from '../../../typing';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Transition, Dialog } from '@headlessui/react';
import * as React from 'react';
import { modalState, movieState } from '../../../atoms/modalAtom';
import { useRecoilState } from 'recoil';

interface Props {
  movie: Movie;
}

export function ThumbnailPotrait({ movie }: Props) {
  // const releaseDate = new Date(movie.release_date || movie.first_air_date);
  // const options = { month: 'short', day: 'numeric', year: 'numeric' };
  // const formattedDate = releaseDate.toLocaleDateString('en-US', options);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <div className="pt-5 h-full">
      <div
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
        }}
        className="cursor-pointer transition duration-200 ease-out hover:brightness-75"
      >
        {/* <p className="text-gray-300 flex text-[10px] relative">
          <ClockIcon className="w-3 mr-1" />
          {formattedDate}
        </p> */}
        <div className="relative h-[150px] md:h-[225px] min-w-[100px] md:min-w-[150px]">
          <Image
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            className="rounded-sm object-cover md:rounded"
            fill
            sizes="100%"
            alt={`Thumbnail ${movie?.name}`}
            draggable={false}
            onClick={() => console.log(movie)}
          />
          <span className=" h-7 w-7 flex justify-center items-center rounded-full text-[.7rem] bg-zinc-800 text-white font-semibold z-10 absolute bottom-0 right-0 mr-1 mb-1">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
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
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-44 md:min-w-[300px] hover:brightness-75`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        className="rounded-sm object-cover md:rounded bg-cover"
        fill
        sizes="100%"
        alt={`Thumbnail ${movie?.name}`}
        onClick={() => console.log(movie)}
        draggable={false}
      />
    </div>
  );
}
