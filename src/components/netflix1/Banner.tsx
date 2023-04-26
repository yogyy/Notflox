import { PlayIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import * as React from 'react';
import { baseUrl } from '../../../constants/movie';
import { Movie } from '../../../typing';
import LongText from './ReadMore';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../../../atoms/modalAtom';

interface Props {
  banner: Movie[];
}

const getRandomMovie = (movies: string | any[]) => {
  return movies[Math.floor(Math.random() * movies.length)];
};

export default function Banner({ banner }: Props) {
  const [movie, setMovie] = React.useState<Movie>();

  // React.useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setMovie(getRandomMovie(banner));
  //   }, 30000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [banner]);

  React.useEffect(() => {
    setMovie(banner[Math.floor(Math.random() * banner.length)]);
  }, [banner]);
  return (
    <div className="relative h-full">
      <div className="relative h-[56.25vw]">
        <div className="relative w-screen h-[56.25vw] object-cover brightness-50">
          <Image
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            fill
            alt={`${movie?.name}`}
            priority
            draggable={false}
          />
          <div className="absolute bg-gradient-to-b from-transparent h-3/4 to-[#121212] bottom-0 w-full" />
        </div>
        <div className="absolute top-[20%] ml-4 md:ml-16 flex flex-col gap-3 min-w-[300px] drop-shadow-lg">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
            <LongText text={movie?.overview} maxLength={150} />
          </p>
          <div className="">
            <button className="bannerButton bg-white text-black">
              <PlayIcon className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
            </button>
          </div>
        </div>
      </div>
      <span className="m-10" />
    </div>
  );
}
