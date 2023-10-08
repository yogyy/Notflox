import React from 'react';
import { Movie } from '~/typing';
import Image from 'next/image';
import Link from 'next/link';
import { ClockIcon, FolderIcon } from '@heroicons/react/24/outline';
import { tanggal } from '@/lib/getDate';
import { cn } from '@/lib/utils';
import convertGenreIdsToNames from '@/utils/genreToName';

interface ReccomendationProps extends React.HTMLAttributes<HTMLElement> {
  movies: Movie[];
}

const Recommendation: React.FC<ReccomendationProps> = ({
  movies,
  title,
  className,
  ...props
}) => {
  return (
    <section
      className={cn('relative h-auto space-y-0.5 md:space-y-2 mx-4', className)}
      {...props}>
      <h2
        className="text-xl font-semibold text-[#fcfbfb] pt-16 mb-5"
        id="similar-container">
        {title}
      </h2>
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2">
        <>
          {movies.map(movie => (
            <article key={movie.id} className="flex flex-col group">
              <Link
                href={`/${movie.media_type == 'movie' ? 'movie' : 'tv'}/${
                  movie.id
                }`}
                className="w-fit">
                <h1 className="text-xl group-hover:text-red-400 transition duration-200">
                  {movie.title || movie.name}
                </h1>
              </Link>
              <div className="text-gray-300 flex text-[10px] relative flex-col sm:flex-row sm:gap-2">
                <span className="inline-flex gap-1">
                  <ClockIcon className="w-3" />
                  {tanggal(movie.release_date || movie.first_air_date)}
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
          ))}
        </>
      </div>
    </section>
  );
};

export default Recommendation;
