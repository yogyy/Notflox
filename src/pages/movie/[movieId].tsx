import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import { ProductionCompany } from '../../../typing';
import { tanggal } from '@/lib/getDate';
import router from 'next/router';
import { useSession } from 'next-auth/react';
import LoaderBlock from '@/components/loader/loaderblock';
import ModalVid from '@/components/netflix1/ModalVid';
import { useAtom } from 'jotai';
import { modalState, movieState } from '../../../atoms/jotaiAtoms';
import Keywords from '@/components/keywords';
import Similars from '@/components/similars';

interface Props {
  movie: Movie;
  productions: ProductionCompany[];
  genres: Genre[];
}
export default function MovieDetails({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useAtom(movieState);
  const [showModal, setShowModal] = useAtom(modalState);

  const { data: session } = useSession();

  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [session]);

  React.useEffect(() => {
    setShowModal(false);
  }, [movie.id]);

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
          <div className="relative mx-auto md:justify-center md:-mt-[20%] lg:-mt-[40%] flex gap-5 flex-col md:flex-row px-5 items-center md:items-start pt-4 bg-gradient-to-b from-[#5f5f5f]/20 to-[#121212]/20 md:bg-none">
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
                <button
                  className="flex items-center transition-colors duration-300 group justify-center md:justify-between px-3 py-1.5 w-full hover:font-semibold text-gray-300 border rounded hover:shadow-red-600 shadow-sm hover:bg-[#121212]/20 bg-black/25 hover:border-red-600"
                  onClick={() => {
                    setCurrentMovie(movie);
                    setShowModal(true);
                  }}
                  title={`Play ${movie?.title} Trailer`}
                >
                  <span className="hidden md:block">Trailer&nbsp;</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-5 text-gray-300 transition-colors duration-300 group-hover:text-red-600"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full md:w-7/12">
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
              <hr className="my-2 border-zinc-800" />
              <div className="text-sm text-gray-300">
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
              <hr className="mt-2 mb-12 border-zinc-800" />
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
