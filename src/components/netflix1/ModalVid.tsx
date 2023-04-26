import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';
import {
  CheckIcon,
  HandThumbUpIcon,
  PlayIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {
  Element,
  Genre,
  Movie,
  Network,
  ProductionCompany,
} from '../../../typing';
import { API_KEY, BASE_URL } from '@/utils/request';
import ReactPlayer from 'react-player/youtube';
import axios from 'axios';

function ModalVid() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);

  const [trailer, setTrailer] = React.useState('');
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [networks, setNetworks] = React.useState<ProductionCompany[]>([]);
  const [muted, setMuted] = React.useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(`/api/modal/${movie?.id}`);
      const data = response.data.data;
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
      if (data?.production_companies) {
        setNetworks(data.production_companies);
      }
    }

    fetchMovie();
  }, [movie, trailer]);

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        {trailer && (
          <button
            className="modalButton absolute right-3 top-3 !z-20 h-6 w-6 xl:h-9 xl:w-9 border-none bg-[#181818] hover:bg-[#181818]"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4 xl:h-6 xl:w-6" />
          </button>
        )}
        <div className="relative pt-[56.25%]">
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                // pointerEvents: 'none',
              }}
              controls
              playing
              muted={muted}
              volume={0.3}
            />
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movie?.backdrop_path || movie?.poster_path
              }`}
              className="rounded-t-sm object-cover md:rounded-t"
              fill
              sizes="100%"
              alt={`Thumbnail ${movie?.name || movie?.title}`}
              draggable={false}
            />
          )}
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#121212] px-10 py-8">
          <div className="space-y-6 text-lg">
            <h1 className="font-bold text-xl">{movie?.title || movie?.name}</h1>
            <div className="flex items-center space-x-2 text-sm ">
              <p className="font-semibold text-sm text-green-400">
                {movie &&
                  `${(movie.vote_average * 10).toString().slice(0, 2)}% Match`}
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row justify-between">
              <p className="w-5/6 text-base">
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
                  <span className="text-[gray]">Genres : </span>
                  {genres.map(genre => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                  <span className="flex gap-3 flex-wrap mt-2">
                    {networks.map(network => (
                      <div key={network.id}>
                        {network.logo_path && (
                          <Image
                            width={50}
                            height={50}
                            style={{ height: 'auto' }}
                            src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                            alt={network.name}
                          />
                        )}
                      </div>
                    ))}
                  </span>
                </div>

                <div className=""></div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default ModalVid;
