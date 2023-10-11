import Link from 'next/link';
import { useState } from 'react';
import Paginate from '../paginate';
import fetcher from '@/lib/fetcher';
import NextImage from '../next-image';
import { MovieResponse } from '~/typing';
import { BASE_URL } from '@/utils/request';
import { useQueries } from '@tanstack/react-query';
import AnimeAiringLoading from '../loader/anime-airing-loading';
import { getImageUrl } from '@/lib/utils';

const AnimeAiring = () => {
  const queryConfigurations = Array.from({ length: 4 }, (_, page) => ({
    queryKey: ['anime-airing', page + 1],
    queryFn: () =>
      fetcher<MovieResponse>(
        `${BASE_URL}/tv/on_the_air?page=${
          page + 1
        }&with_genres=16&with_original_language=ja&with_keywords=210024`
      ),
    cacheTime: 60 * 60 * 1000,
  }));
  const queryResults = useQueries({ queries: queryConfigurations });

  const combinedData = queryResults.map(res => res.data?.results).flat();
  const isLoading = queryResults.some(res => res.isLoading);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(12);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentAiring = combinedData?.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="w-full max-w-[948px] mx-auto">
      <div className="w-full py-1">
        <h1 className="mb-5 text-xl font-semibold text-primary">
          Recent Released
        </h1>
      </div>
      {isLoading ? (
        <AnimeAiringLoading />
      ) : (
        <ul className="relative grid grid-cols-2 min-[320px]:grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 place-content-center moviecard-container">
          {currentAiring?.map(tv => (
            <li
              key={tv?.original_name}
              className="overflow-hidden rounded moviecard">
              <Link
                href={`/tv/${tv?.id}`}
                aria-label={tv?.name || tv?.title}
                className="relative w-auto h-auto aspect-poster">
                <span className="absolute bottom-0 pb-1 z-[1] w-full bg-black/70">
                  <h2 className="flex items-center justify-center text-sm font-semibold text-center text-gray-300 sm">
                    {tv!.name.length <= 20
                      ? tv!.name
                      : `${tv!.name.slice(0, 20)}...`}
                  </h2>
                </span>
                <div className="relative w-full h-auto aspect-poster">
                  <NextImage
                    src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${tv?.poster_path}`}
                    alt={`thumbnail ${tv?.name}`}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Paginate
        currentPage={currentPage}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        totalPost={combinedData.length}
      />
    </div>
  );
};

export default AnimeAiring;
