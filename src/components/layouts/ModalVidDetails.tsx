import React from 'react';
import { tanggal } from '@/lib/getDate';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Movie } from '~/typing';

type ModalVidDetailsProps = {
  movie: Movie | undefined;
  closeModal: () => void;
};

const ModalVidDetails = ({ movie, closeModal }: ModalVidDetailsProps) => {
  return (
    <div className="flex px-8 py-8 space-x-16 rounded-b-md">
      <div className="w-full space-y-6 text-lg">
        <div className="relative flex">
          <h1 className="text-xl font-bold">{movie?.title || movie?.name}</h1>
          <button
            title="close"
            onClick={closeModal}
            type="button"
            className="bg-black rounded-full w-8 h-8 grid place-content-center absolute right-0 -top-6">
            <XMarkIcon className="w-5 font-bold" />
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm ">
          <p
            className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-green-400"
            title="average vote">
            <span>
              <StarIcon className="w-4 h-4" />
            </span>
            {movie && `${movie.vote_average.toString().slice(0, 3)}/10`}
          </p>
          <p className="font-light">
            {movie?.media_type === 'movie'
              ? tanggal(movie?.release_date)
              : tanggal(movie?.first_air_date)}
          </p>
          <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs text-green-400">
            HD
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between font-light gap-x-10 gap-y-4">
          <p className="w-5/6 text-gray-300">
            {movie?.overview}{' '}
            {!movie?.overview && (
              <>
                <span className="text-red-500">overview not avaiable.</span>{' '}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                at illo vero eius doloremque, ut magnam nobis minima, officia
                odit quia?
              </>
            )}
          </p>
          <div className="flex flex-col space-y-3 text-sm">
            <div>
              <p>
                Genres :&nbsp;
                <span className="font-semibold">
                  {movie?.genres.map(genre => genre.name).join(', ')}
                </span>
              </p>
            </div>
            <div>
              <p>
                Original language:&nbsp;
                <span className="font-semibold">
                  {movie?.original_language.toUpperCase()}
                </span>
              </p>
            </div>
            <div className="flex w-full">
              <p>
                Sudio :&nbsp;
                <span className="font-semibold">
                  {movie?.production_companies
                    .map(network => network.name)
                    .join(', ')}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVidDetails;
