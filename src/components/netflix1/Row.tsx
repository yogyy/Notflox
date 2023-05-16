import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { Movie } from '../../../typing';
import { ThumbnailLanscape, ThumbnailPotrait } from './Thumbnail';
import clsx from 'clsx';

interface Props {
  title: string;
  movies: Movie[];
  className?: string;
}

export function RowPotrait({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

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
    <div className="relative h-auto space-y-0.5 md:space-y-2">
      <h2 className="ml-5 text-sm font-semibold transition duration-200 w-fit md:text-2xl">
        {title}
      </h2>
      <div className="relative group">
        <ChevronLeftIcon
          className={`absolute bg-black/20 top-0 bottom-0 left-2 z-[15] m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5 px-2"
          ref={rowRef}
        >
          {movies?.map(movie => (
            <ThumbnailPotrait key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute bg-black/20 top-0 bottom-0 right-2 z-[15] m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}

export function RowPotraitLoading() {
  return (
    <div className={clsx('h-auto relative space-y-0.5 md:space-y-2')}>
      <div className="h-4 mb-1 ml-5 w-44 animate-pulse bg-zinc-800" />
      <div className="relative">
        <div className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 px-2.5">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-[9/14] w-[92px] lg:w-[164px] h-full rounded-sm bg-zinc-800 animate-pulse md:rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RowLanscape({ title, movies, className }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

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
    <div
      className={clsx('h-auto relative space-y-0.5 md:space-y-2 ', className)}
    >
      <h2 className="ml-5 text-sm font-semibold w-fit md:text-2xl">{title}</h2>
      <div className="relative group">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-[15] m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 px-2"
          ref={rowRef}
        >
          {movies?.map(movie => (
            <ThumbnailLanscape key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-[15] m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}

export function RowLanscapeLoading() {
  return (
    <div className={clsx('h-auto relative space-y-0.5 md:space-y-2')}>
      <div className="h-4 mb-1 ml-5 w-44 animate-pulse bg-zinc-800" />
      <div className="relative">
        <div className="flex grow items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 px-2.5">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-video w-[220px] lg:w-[342px] rounded-sm bg-zinc-800 animate-pulse md:rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
