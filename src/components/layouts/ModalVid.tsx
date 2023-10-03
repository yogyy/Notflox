import * as React from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player/youtube';
import axios from 'axios';
import { Movie } from '~/typing';
import { API_KEY, BASE_URL } from '@/utils/request';
import { useQuery } from '@tanstack/react-query';
import { modalState, movieState } from '~/atoms/jotaiAtoms';
import { useAtom } from 'jotai';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/UI/use-toast';
import ModalVidDetails from './ModalVidDetails';

interface modalProps {
  showDetail?: boolean;
}

function ModalVid({ showDetail }: modalProps) {
  const [showModal, setShowModal] = useAtom(modalState);
  const [movie, setMovie] = useAtom(movieState);
  const [trailer, setTrailer] = React.useState('');
  const [videoError, setVideoError] = React.useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    setShowModal(false);
    setMovie(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const { data } = useQuery<Movie>(
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
        element => element.type === 'Trailer'
      );
      setTrailer(data.videos?.results[index]?.key);
    }
  }, [data]);

  React.useEffect(() => {
    if (data?.videos.results.length === 0 || videoError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Trailer not available',
      });
    }
  }, [data, toast, videoError]);

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
                      className="sr-only"
                      onClick={handleClose}>
                      close modal
                    </button>
                    <div className="relative w-full h-auto max-w-5xl aspect-video focus:outline-none">
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
                          sizes="90%"
                          alt={`Thumbnail ${movie?.name || movie?.title}`}
                          draggable={false}
                        />
                      )}
                    </div>
                    {showDetail === true && (
                      <ModalVidDetails movie={data} closeModal={handleClose} />
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
