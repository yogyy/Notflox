import * as React from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
import axios from 'axios';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Element, Genre, Movie, ProductionCompany } from '~/typing';
import { API_KEY, BASE_URL } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { modalState, movieState } from '~/atoms/jotaiAtoms';
import { useAtom } from 'jotai';
import { tanggal } from '@/lib/getDate';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

interface modalProps {
  showDetail?: boolean;
}

function ModalVid({ showDetail }: modalProps) {
  const [showModal, setShowModal] = useAtom(modalState);
  const [movie, setMovie] = useAtom(movieState);
  const [trailer, setTrailer] = React.useState('');
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [networks, setNetworks] = React.useState<ProductionCompany[]>([]);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
  };
  const [videoError, setVideoError] = React.useState(false);
  const { data } = useQuery(
    ['movie', movie?.id],
    async () => {
      const response = await axios.get(
        `${BASE_URL}/${movie?.first_air_date ? '/tv' : '/movie'}/${
          movie?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      );
      return response.data;
    },
    {
      cacheTime: 0,
      staleTime: 0,
    }
  );

  React.useEffect(() => {
    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (element: Element) => element.type === 'Trailer'
      );
      setTrailer(data.videos?.results[index]?.key);
      if (index) {
        toast.error('Trailer not available', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }
    if (data?.genres) {
      setGenres(data.genres);
    }
    if (data?.production_companies) {
      setNetworks(data.production_companies);
    }
  }, [data]);

  return (
    <>
      <Transition appear show={showModal} as={React.Fragment}>
        <Dialog as="div" className="relative z-30" onClose={handleClose}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>
          <div
            className={cn(
              'fixed inset-0 top-[15%] overflow-x-hidden overflow-y-scroll rounded-md scrollbar-hide',
              !showDetail && ''
            )}>
            <div className="flex items-start justify-center min-h-full text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel
                  className={cn(
                    'max-w-5xl w-[64rem] transform rounded-2xl text-left align-middle shadow-xl transition-all bg-ireng/95',
                    !showDetail && 'rounded-none'
                  )}>
                  <div className="text-lg font-medium text-gray-300">
                    <button
                      type="button"
                      className="relative w-full h-auto max-w-5xl aspect-video focus:outline-none">
                      {trailer && !videoError ? (
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${trailer}`}
                          width="100%"
                          height="100%"
                          controls
                          style={{ background: '#121212' }}
                          playing={true}
                          volume={0.3}
                          onError={() => {
                            setVideoError(true);
                          }}
                        />
                      ) : (
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${
                            movie?.backdrop_path || movie?.poster_path
                          }`}
                          className="object-cover rounded-t-sm md:rounded-t"
                          fill
                          sizes="100%"
                          alt={`Thumbnail ${movie?.name || movie?.title}`}
                          draggable={false}
                        />
                      )}
                    </button>
                    {showDetail === true && (
                      <div className="flex px-10 py-8 space-x-16 rounded-b-md">
                        <div className="w-full space-y-6 text-lg">
                          <div className="flex justify-between">
                            <h1 className="text-xl font-bold">
                              {movie?.title || movie?.name}
                            </h1>
                            <button
                              title="close"
                              onClick={handleClose}
                              type="button"
                              className="bg-black p-1.5 rounded-full">
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
                              {movie &&
                                `${movie.vote_average
                                  .toString()
                                  .slice(0, 3)}/10`}
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
                                  <span className="text-red-500">
                                    overview not avaiable.
                                  </span>{' '}
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Cumque at illo vero eius
                                  doloremque, ut magnam nobis minima, officia
                                  odit quia?
                                </>
                              )}
                            </p>
                            <div className="flex flex-col space-y-3 text-sm">
                              <div>
                                <p>
                                  Genres :&nbsp;
                                  <span className="font-semibold">
                                    {genres.map(genre => genre.name).join(', ')}
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
                                    {networks
                                      .map(network => network.name)
                                      .join(', ')}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ModalVid;
