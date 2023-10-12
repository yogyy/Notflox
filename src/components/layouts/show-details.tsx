import { Movie } from '~/typing';
import { cn } from '@/lib/utils';
import NextImage from '../next-image';
import { tanggal } from '@/lib/getDate';
import { imgUrl } from '~/constants/movie';
import ButtonTrailer from '../UI/ButtonTrailer';

interface ShowDetailsProps {
  show: Movie | undefined;
  playFunc: () => void;
}

const ShowDetails = ({ show, playFunc }: ShowDetailsProps) => {
  return (
    <div
      className={cn(
        'relative flex-col sm:items-center px-5 pt-4 flex gap-5',
        'bg-gradient-to-b from-[#5f5f5f]/20 to-ireng/20 max-w-7xl mx-auto justify-start',
        'md:bg-none md:flex-row md:items-start md:-mt-[20%] lg:-mt-[40%]'
      )}>
      <div className="flex gap-3 flex-col min-[300px]:flex-row sm:block -mt-14 sm:mt-0">
        <div className="relative h-full gap-3 md:flex md:flex-col">
          <div className="relative aspect-[27/40] w-32 sm:w-40 sm:-mt-32 rounded md:mt-0 ">
            <NextImage
              src={`${imgUrl}/w220_and_h330_bestv2${show?.poster_path}`}
              className="object-cover rounded-sm md:rounded"
              alt={`${show?.name || show?.title} poster`}
              fetchPriority="auto"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-3 text-sm sm:mt-3">
          <span className="font-mono text-base md:text-3xl sm:hidden">
            {show?.tagline}
          </span>
          <ButtonTrailer
            onClick={playFunc}
            title={`Play ${show?.name || show?.title} Trailer`}
            className="w-32 sm:w-40"
            type="button"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="pb-2 border-b border-zinc-800/25">
          <h1 className="text-xl font-semibold text-red-600">
            {show?.name || show?.title}&nbsp;
            <span className="text-gray-300">
              (
              {show?.first_air_date?.slice(0, 4) ||
                show?.release_date?.slice(0, 4)}
              )
            </span>
          </h1>
          <h2 className="text-gray-500">
            {show?.original_name || show?.original_title}
          </h2>
          <p className="text-sm text-gray-400 lg:text-base">{show?.overview}</p>
        </div>
        <div className="pb-2 mt-3 text-sm text-gray-300 border-b border-zinc-800/25">
          <p className="text-inherit">
            Aired : {tanggal(show?.first_air_date || show?.release_date)}
            {show?.first_air_date && (
              <span>&nbsp;to {tanggal(show?.last_air_date || '?')}</span>
            )}
          </p>
          <p className="text-inherit">Status : {show?.status}</p>
          <p className="text-inherit">
            Genre :&nbsp;
            <span className="text-red-300">
              {show?.genres.map(genre => genre.name).join(', ')}
            </span>
          </p>
          <p className="text-inherit">
            <span className="">Rating :&nbsp;</span>
            {show?.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-sm text-inherit">
            Studio :&nbsp;
            {show?.production_companies.map(studio => studio.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
