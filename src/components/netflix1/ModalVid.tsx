import * as React from 'react';
import Modal from '@mui/material/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Element, Genre, ProductionCompany } from '../../../typing';
import { API_KEY, BASE_URL } from '@/utils/request';
import ReactPlayer from 'react-player/youtube';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoaderBlock from '../loader/loaderblock';
import { modalState, movieState } from '../../../atoms/jotaiAtoms';
import { useAtom } from 'jotai';
import { tanggal } from '@/lib/getDate';
import clsx from 'clsx';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

interface modalProps {
  showDetail?: boolean;
}

function ModalVid({ showDetail }: modalProps) {
  const [showModal, setShowModal] = useAtom(modalState);
  const [movie, setMovie] = useAtom(movieState);

  const [trailer, setTrailer] = React.useState([]);
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [networks, setNetworks] = React.useState<ProductionCompany[]>([]);
  const [muted, setMuted] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
  };
  const [videoError, setVideoError] = React.useState(false);
  const { data, isError, isFetching } = useQuery(
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
        (element: Element) => element.type === 'Trailer' || 'Opening Credits'
      );
      setTrailer(data.videos?.results[index]?.key);
    }
    if (data?.genres) {
      setGenres(data.genres);
    }
    if (data?.production_companies) {
      setNetworks(data.production_companies);
    }
  }, [data]);

  if (isError)
    return (
      <div className="fixed inset-0 bg-[#121212]/50 backdrop-blur-sm z-40">
        <LoaderBlock />
      </div>
    );

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className={clsx(
        showDetail === false ? '!top-32' : '!top-7 left-0 right-0',
        'fixed z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide px-2'
      )}
    >
      <>
        {trailer && (
          <button
            className="modalButton xl:hidden absolute right-3 top-3 !z-20 h-6 w-6 xl:h-9 xl:w-9 border-none bg-[#181818] hover:bg-[#181818]"
            onClick={handleClose}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
        <div className="relative pt-[56.25%]">
          {trailer && !videoError ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
              }}
              controls
              playing={true}
              muted={muted}
              volume={0.3}
              onError={() => {
                setVideoError(true);
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
        </div>
        {showDetail === true && (
          <div className="flex space-x-16 rounded-b-md bg-[#121212]/95 px-10 py-8">
            <div className="space-y-6 text-lg">
              <h1 className="text-xl font-bold">
                {movie?.title || movie?.name}
              </h1>
              <div className="flex items-center space-x-2 text-sm ">
                <p className="text-sm font-semibold text-green-400">
                  {movie &&
                    `${(movie.vote_average * 10)
                      .toString()
                      .slice(0, 2)}% Match`}
                </p>
                <p className="font-light">
                  {movie?.media_type === 'movie'
                    ? tanggal(movie?.release_date)
                    : tanggal(movie?.first_air_date)}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cumque at illo vero eius doloremque, ut magnam nobis
                      minima, officia odit quia?
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
                        {networks.map(network => network.name).join(', ')}
                      </span>
                    </p>
                  </div>

                  <div className=""></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </Modal>
  );
}

export default ModalVid;
