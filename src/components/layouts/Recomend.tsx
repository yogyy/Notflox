import * as React from 'react';
import { Movie } from '~/typing';
import Image from 'next/image';
import Link from 'next/link';
import { ClockIcon, FolderIcon } from '@heroicons/react/24/outline';
import { tanggal } from '@/lib/getDate';
import { cn } from '@/lib/utils';

interface reccomend extends React.ComponentPropsWithRef<'section'> {
  title: string;
  movies: Movie[];
}

export default function Recomend({ movies, title, className }: reccomend) {
  return (
    <section
      className={cn(
        'relative h-auto space-y-0.5 md:space-y-2 mx-4',
        className
      )}>
      <h2
        className="text-xl font-semibold text-[#fcfbfb] pt-16 mb-5"
        id="similar-container">
        {title}
      </h2>
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2">
        <>
          {movies.map(movie => (
            <Details key={movie.id} movie={movie} />
          ))}
        </>
      </div>
    </section>
  );
}

interface DetailProps {
  movie: Movie;
}

function Details({ movie }: DetailProps) {
  const formattedDate = tanggal(movie.release_date || movie.first_air_date);
  return (
    <article className="flex flex-col group">
      <Link
        href={`/${movie.media_type == 'movie' ? 'movie' : 'tv'}/${movie.id}`}
        className="w-fit">
        <h1 className="text-xl group-hover:text-red-400 transition duration-200">
          {movie.title || movie.name}
        </h1>
      </Link>
      <div className="text-gray-300 flex text-[10px] relative flex-col sm:flex-row sm:gap-2">
        <span className="inline-flex gap-1">
          <ClockIcon className="w-3" />
          {formattedDate}
        </span>
        <span className="inline-flex gap-1 cursor-pointer hover:text-gray-300">
          <FolderIcon className="w-3" />
          {convertGenreIdsToNames(movie.genre_ids, movie)}
        </span>
      </div>
      <>
        <div className="flex gap-2 max-h-[150px] md:max-h-[249px]">
          <Link
            href={`/${movie.media_type == 'movie' ? 'movie' : 'tv'}/${
              movie.id
            }`}
            className="relative aspect-[27/40] w-28 md:w-40 bg-[#1c1c1c] rounded">
            <Image
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              className="object-cover rounded-sm md:rounded brightness-90 group-hover:brightness-100 transition duration-200"
              fill
              sizes="auto"
              alt={`Thumbnail ${movie.name || movie.title}`}
              draggable={false}
            />
          </Link>
          <p className="flex-1 text-gray-400 text-sm max-h-[150px] md:max-h-[249px] overflow-y-scroll scrollbar-hide">
            {movie.overview} <br />
          </p>
        </div>
        <hr className="border-[#141414] my-2" />
      </>
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
