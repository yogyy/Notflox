import * as React from 'react';
import { useAtom } from 'jotai';
import { cn } from '@/lib/utils';
import { Movie } from '~/typing';
import fetcher from '@/lib/fetcher';
import NextImage from '../next-image';
import ReactPlayer from 'react-player/youtube';
import { useQuery } from '@tanstack/react-query';
import { baseUrl, imgUrl } from '~/constants/movie';
import ModalVidDetails from './modal-video-details';
import { useToast } from '@/components/UI/use-toast';
import { Dialog, Transition } from '@headlessui/react';
import { modalState, movieState } from '~/atoms/jotaiAtoms';

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

  const { data, isLoading } = useQuery(['movie', movie?.id], () =>
    fetcher<Movie>(
      `${baseUrl}/${movie?.first_air_date ? '/tv' : '/movie'}/${
        movie?.id
      }?language=en-US&append_to_response=videos`
    )
  );

  React.useEffect(() => {
    if (data?.videos) {
      const index = data.videos.results.findIndex(
        element => element.type === 'Trailer'
      );
      setTrailer(data.videos?.results[index]?.key);
      if (!data.videos?.results[index]?.key) {
        setVideoError(true);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoError]);

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
                        <NextImage
                          src={`${imgUrl}/w1280/${
                            movie?.backdrop_path || movie?.poster_path
                          }`}
                          className="rounded-t-sm md:rounded-t"
                          alt={`${movie?.name || movie?.title} thumbnail`}
                        />
                      )}
                    </div>
                    {showDetail && (
                      <ModalVidDetails
                        loading={isLoading}
                        movie={data}
                        closeModal={handleClose}
                      />
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
