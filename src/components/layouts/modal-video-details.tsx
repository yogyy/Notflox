import React from 'react';
import { Movie } from '~/typing';
import { tanggal } from '@/lib/getDate';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline';

type ModalVidDetailsProps = {
  movie: Movie | undefined;
  closeModal: () => void;
  loading: boolean;
};

const ModalVidDetails = ({
  movie,
  closeModal,
  loading,
}: ModalVidDetailsProps) => {
  return (
    <div className="flex px-8 py-8 space-x-16 rounded-b-md">
      {loading ? (
        <div className="relative flex flex-col w-full space-y-6">
          <div className="w-1/3 h-5 rounded-sm bg-zinc-800 animate-pulse" />
          <div className="w-1/6 h-3.5 rounded-sm bg-green-400 animate-pulse" />
          <div className="flex flex-col gap-y-4">
            <div className="w-1/3 h-4 rounded-sm bg-zinc-800 animate-pulse" />
            <div className="w-1/12 h-4 rounded-sm bg-zinc-800 animate-pulse" />
            <div className="w-1/4 h-4 rounded-sm bg-zinc-800 animate-pulse" />
          </div>
          <div className="w-3/5 h-4 rounded-sm bg-zinc-800 animate-pulse" />
        </div>
      ) : (
        <div className="w-full space-y-6 text-lg">
          <div className="relative flex">
            <h1 className="text-xl font-bold">{movie?.title || movie?.name}</h1>
            <button
              title="close"
              onClick={closeModal}
              type="button"
              className="absolute right-0 grid w-8 h-8 bg-black rounded-full place-content-center -top-6">
              <XMarkIcon className="w-5 font-bold" />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <p
              className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-green-400"
              title="average vote">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque at illo vero eius doloremque, ut magnam nobis minima,
                  officia odit quia?
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
      )}
    </div>
  );
};

export default ModalVidDetails;
