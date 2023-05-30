import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import { ProductionCompany } from '../../../typing';
import { tanggal } from '@/lib/getDate';
import { useSession } from 'next-auth/react';
import LoaderBlock from '@/components/loader/loaderblock';
import ModalVid from '@/components/netflix1/ModalVid';
import { useAtom } from 'jotai';
import { modalState, movieState } from '../../../atoms/jotaiAtoms';
import Keywords from '@/components/keywords';
import Similars from '@/components/similars';
import { useRouter } from 'next/router';
import { kebabCase } from 'lodash';
import nProgress from 'nprogress';
import { PlayIcon } from '@/components/icons/play';
import ButtonTrailer from '@/components/UI/ButtonTrailer';
import clsx from 'clsx';

interface Props {
  movie: Movie;
  productions: ProductionCompany[];
  genres: Genre[];
}
export default function MovieDetails({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useAtom(movieState);
  const [showModal, setShowModal] = useAtom(modalState);
  const router = useRouter();

  const { data: session } = useSession();

  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [router, session]);

  React.useEffect(() => {
    router.replace(`${movie.id}?${kebabCase(movie.title)}`);
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.id]);

  const playTrailer = () => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  return (
    <RootLayout title={movie.title}>
      {session ? (
        <>
          <div className="relative w-full h-[56.25vw] object-cover brightness-50">
            <span className="absolute top-[14%] left-[20%] text-xl md:text-3xl font-mono z-10">
              {movie.tagline}
            </span>
            <Image
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              className="bg-black/25"
              fill
              alt={`Banner ${movie.title}`}
              priority
              draggable={false}
            />
            <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
          </div>
          <div
            className={clsx(
              'relative mx-auto flex gap-5 flex-col px-5 items-center pt-4',
              'md:justify-center md:flex-row md:items-start md:bg-none md:-mt-[20%] lg:-mt-[40%]',
              'bg-gradient-to-b from-[#5f5f5f]/20 to-[#121212]/20'
            )}
          >
            <div className="relative h-full gap-3 md:flex md:flex-col">
              <div className="relative w-[165px] h-[255px] -mt-32 rounded md:mt-0 ">
                <Image
                  src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                  className="flex object-cover rounded-sm md:rounded"
                  fill
                  sizes="auto"
                  alt={`Thumbnail ${movie?.title}`}
                  draggable={false}
                />
              </div>
              <div className="flex w-full gap-2 mt-2 text-sm md:flex-col">
                <ButtonTrailer
                  onClick={playTrailer}
                  title={`Play ${movie?.title} Trailer`}
                />
              </div>
            </div>
            <div className="w-full md:w-7/12">
              <div className="pb-2 border-b border-zinc-800">
                <h1 className="text-xl font-semibold text-red-600 w-fit">
                  {movie.title}&nbsp;
                  <span className="text-gray-300">
                    ({movie.release_date?.slice(0, 4)})
                  </span>
                </h1>
                <h2 className="text-gray-500">{movie?.original_title}</h2>
                <p className="text-sm text-gray-400 lg:text-base">
                  {movie.overview}
                </p>
              </div>
              <div className="pb-2 mt-3 text-sm text-gray-300 border-b border-zinc-800">
                <p>Aired : {tanggal(movie.release_date)}</p>
                <p>Status : {movie.status}</p>
                <div className="text-gray-300">
                  <p>
                    Genre :&nbsp;
                    <span className="text-red-300">
                      {movie.genres.map(genre => genre.name).join(', ')}
                    </span>
                  </p>
                </div>
                <p className="text-gray-300">
                  <span className="">Rating :&nbsp;</span>
                  {movie.vote_average.toFixed(1)} / 10
                </p>
                <div className="text-sm text-gray-300">
                  <p>
                    Studio :&nbsp;
                    {movie.production_companies
                      ?.map(studio => studio.name)
                      .join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-12 md:space-y-10 mx-auto relative max-w-[1300px]">
              <Keywords type="movie" keyword={movie.id} />
              <Similars type="movie" similar={movie.id} />
            </div>
          </div>
        </>
      ) : (
        <LoaderBlock />
      )}
      {showModal && <ModalVid showDetail={false} />}
    </RootLayout>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const movieId = Number(params.movieId);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );

    return {
      props: {
        movie: data,
      },
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
}
