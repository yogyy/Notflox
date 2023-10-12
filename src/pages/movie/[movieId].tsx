import * as React from 'react';
import { useAtom } from 'jotai';
import { Movie } from '~/typing';
import { AxiosError } from 'axios';
import dynamic from 'next/dynamic';
import fetcher from '@/lib/fetcher';
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import Keywords from '@/components/keywords';
import NextImage from '@/components/next-image';
import { imgUrl, imageOg } from '~/constants/movie';
import RootLayout from '@/components/layouts/layout';
import Similars from '@/components/layouts/similar-show';
import LoaderBlock from '@/components/loader/loaderblock';
import ShowDetails from '@/components/layouts/show-details';
import { changeMovieState, modalState } from '~/atoms/jotaiAtoms';

const DynamicModalVideo = dynamic(
  () => import('@/components/layouts/modal-video'),
  { ssr: false }
);

export default function MovieDetails({ movie }: { movie: Movie }) {
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
        <div className="relative w-full sm:h-[56.25vw] object-cover aspect-video brightness-50">
          <span className="absolute top-[14%] left-[20%] text-xl md:text-[2vw] font-mono z-10 hidden sm:block cursor-default">
            {movie.tagline}
          </span>
          <NextImage
            src={`${imgUrl}/original${
              movie.backdrop_path || movie.poster_path
            }`}
            className="bg-black/25"
            alt={`Banner ${movie.title}`}
            priority
          />
          <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
        </div>
        <ShowDetails show={movie} playFunc={playTrailer} />
        <div>
          <div className="relative mx-auto space-y-12 md:space-y-10 max-w-7xl">
            <Keywords type="movie" keyword={movie.id} />
            <Similars type="movie" similar={movie.id} />
          </div>
        </div>
        {showModal && <DynamicModalVideo showDetail={false} />}
      </RootLayout>
    </React.Suspense>
  );
}

export async function getServerSideProps(ctx: {
  params: {
    movieId: number;
  };
}) {
  const movieId = Number(ctx.params.movieId);

  try {
    const data = await fetcher<Movie>(
      `https://api.themoviedb.org/3/movie/${movieId}`
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
}
