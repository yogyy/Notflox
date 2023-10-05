import * as React from 'react';
import Keywords from '@/components/keywords';
import Similars from '@/components/layouts/Similars';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import LoaderBlock from '@/components/loader/loaderblock';
import ModalVid from '@/components/layouts/ModalVid';
import kebabCase from 'lodash.kebabcase';
import ShowDetails from '@/components/layouts/ShowDetails';
import axios, { AxiosError } from 'axios';
import { API_KEY } from '@/utils/request';
import { Movie } from '~/typing';
import { useAtom } from 'jotai';
import { changeMovieState, modalState } from '~/atoms/jotaiAtoms';
import { baseUrl, imageOg } from '~/constants/movie';
import { useRouter } from 'next/router';

interface MovieProps {
  movie: Movie;
}

export default function MovieDetails({ movie }: MovieProps) {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [showModal, setShowModal] = useAtom(modalState);
  const { replace } = useRouter();

  React.useEffect(() => {
    replace(`${movie.id}?title=${kebabCase(movie.title)}`);
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.id]);

  const playTrailer = () => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  return (
    <React.Suspense fallback={<LoaderBlock />}>
      <RootLayout
        title={movie.title}
        image={`${imageOg}${movie.backdrop_path}`}
        description={movie.overview}>
        <>
          <div className="relative w-full sm:h-[56.25vw] object-cover aspect-video brightness-50">
            <span className="absolute top-[14%] left-[20%] text-xl md:text-[2vw] font-mono z-10 hidden sm:block cursor-default">
              {movie.tagline}
            </span>
            <Image
              src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
              className="bg-black/25"
              fill
              alt={`Banner ${movie.title}`}
              priority
              draggable={false}
            />
            <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
          </div>
          <ShowDetails show={movie} playFunc={playTrailer} />
          <div>
            <div className="space-y-12 md:space-y-10 mx-auto relative max-w-7xl">
              <Keywords type="movie" keyword={movie.id} />
              <Similars type="movie" similar={movie.id} />
            </div>
          </div>
        </>
        {showModal && <ModalVid showDetail={false} />}
      </RootLayout>
    </React.Suspense>
  );
}

type Params = {
  params: {
    movieId: number;
  };
};

export const getServerSideProps = async ({ params }: Params) => {
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
  } catch (err) {
    const error = err as AxiosError<Error>;
    if (error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
};
