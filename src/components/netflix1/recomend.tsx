import * as React from 'react';
import { Movie } from '../../../typing';
import Image from 'next/image';
import { API_KEY } from '@/utils/request';
import Link from 'next/link';
import { ClockIcon, FolderIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { tanggal } from '@/lib/getDate';

interface reccomend {
  title: string;
  movies: Movie[];
  className?: string;
}

export default function Recomend({ movies, title, className }: reccomend) {
  return (
    <section
      className={clsx(
        'relative h-auto space-y-0.5 md:space-y-2  mx-4',
        className
      )}
    >
      <h2 className="text-xl font-semibold text-[#fcfbfb]">{title}</h2>
      <div className="group relative">
        <div className="">
          {movies.map(movie => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const formattedDate = tanggal(movie.release_date || movie.first_air_date);
  return (
    <article className={clsx('flex flex-col')}>
      <Link
        href={`/${movie.media_type == 'movie' ? 'movie' : 'tv'}/${movie.id}`}
        className="w-max"
      >
        <h1 className="text-xl hover:text-red-300">
          {movie.title || movie.name}
        </h1>
      </Link>
      <span className="text-gray-300 flex text-[10px] relative gap2">
        <ClockIcon className="w-3 mr-1" />
        {formattedDate} <FolderIcon className="w-3 mx-1" />
        <span className="cursor-pointer hover:text-gray-300">
          {convertGenreIdsToNames(movie.genre_ids, movie)}
        </span>
      </span>
      <div className="flex mt-1">
        <Link
          href={`/${movie.media_type == 'movie' ? 'movie' : 'tv'}/${movie.id}`}
          className="relative aspect-[9/14] max-h-[150px] md:max-h-[249px] w-24 md:w-40 bg-slate-800 rounded mr-3 "
        >
          <Image
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            className="rounded-sm object-cover md:rounded float-left hover:brightness-50"
            fill
            sizes="100%"
            alt={`Thumbnail ${movie?.name}`}
            draggable={false}
          />
        </Link>
        <p className="flex-1 text-gray-400 text-sm">
          {movie.overview} <br />
        </p>
      </div>
      <hr className="border-[#141414] my-2" />
    </article>
  );
}

function convertGenreIdsToNames(genreIds: number[], movie: Movie) {
  const genreNames = genreIds.map((genreId: number) => {
    const matchingGenre = (
      movie.media_type === 'tv' ? genreTv : genreMovie
    ).find(genre => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : '';
  });
  return genreNames.join(', ');
}

const genreTv = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
];

const genreMovie = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
