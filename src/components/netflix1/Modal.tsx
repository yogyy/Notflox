import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { Movie } from '../../../typing';
import { Transition, Dialog } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  title: string;
  movies: Movie[];
  className?: string;
}

export function RowModal({ title, movies }: Props) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = React.useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-full space-y-0.5 md:space-y-2 pl-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute bg-black/20 top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5"
          ref={rowRef}
        >
          {movies.map(movie => (
            <ThumbnailHeadless key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute bg-black/20 top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}

interface ModalProps {
  movie: Movie;
}

export const ThumbnailHeadless = ({ movie }: ModalProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="relative h-[150px] md:h-[225px] min-w-[100px] md:min-w-[150px]"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            className="rounded-sm object-cover md:rounded bg-cover"
            fill
            sizes="100%"
            alt={`Thumbnail ${movie?.name}`}
            // onClick={() => console.log(movie)}
            draggable={false}
          />
        </button>
      </div>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    'relative scrollbar-hide w-full max-w-5xl transform overflow-hidden',
                    'text-white bg-black p-6 text-left align-middle shadow-xl transition-all',
                    'flex flex-col-reverse'
                  )}
                >
                  <div className="z-[-2]">
                    {/* <Image
                      className="z-[-1] w-full "
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                      fill
                      alt={movie.title}
                      draggable={false}
                    /> */}
                  </div>
                  <Dialog.Description className="mt-2" as="p">
                    {movie.overview}
                  </Dialog.Description>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 top-0"
                  >
                    {movie.title}
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
