import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Movie } from '~/typing';
import NextImage from '../next-image';

const AnimeWeekly = ({ bannerAnime }: { bannerAnime: Movie[] | undefined }) => {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
      {bannerAnime?.map((tv, index) => (
        <li
          key={tv.id}
          className={cn(
            'text-gray-400',
            index === 0 && 'md:col-span-2 xl:col-span-1'
          )}>
          <Link
            href={`/tv/${tv.id}`}
            target="_blank"
            className="transition-colors duration-200 hover:text-white focus:text-white">
            {index === 0 ? (
              <div className="relative w-full aspect-video h-full max-h-[200px]">
                <div className="absolute h-auto max-h-[200px] w-full aspect-video z-0">
                  <NextImage
                    alt={tv.name}
                    className={cn(
                      'rounded z-[-1] brightness-75 object-center',
                      tv.backdrop_path === null && 'object-contain'
                    )}
                    src={`https://image.tmdb.org/t/p/w500/${
                      tv.backdrop_path || tv.poster_path
                    }`}
                  />
                  <div className="absolute bottom-0 flex items-center justify-center">
                    <h2 className="flex items-center justify-center w-5 h-5 p-5 m-3 text-sm font-semibold text-black border rounded-md bg-white/80">
                      {index + 1}
                    </h2>
                    <h3 className="flex flex-wrap text-base leading-5">
                      {tv.name}
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center gap-1">
                <h2 className="flex items-center justify-center w-5 h-5 p-5 m-3 text-sm font-semibold border rounded-md">
                  {index + 1}
                </h2>
                <div className="relative min-w-[46px] max-h-[60px] aspect-poster">
                  <NextImage
                    alt={tv.original_name}
                    src={`https://image.tmdb.org/t/p/w92${tv.poster_path}`}
                    className="rounded"
                  />
                </div>
                <h3 className="flex flex-wrap text-base leading-5 ml-1.5 place-self-start py-1">
                  {tv.name}
                </h3>
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AnimeWeekly;
