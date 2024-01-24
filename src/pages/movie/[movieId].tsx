import * as React from "react";
import { useAtom } from "jotai";
import { Movie } from "~/types/tmdb-type";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { fetcher } from "@/lib/utils";
import { Keywords } from "@/components/keywords";
import { NextImage } from "@/components/next-image";
import { imgUrl, imageOg } from "~/constants/movie";
import RootLayout from "@/components/layouts/layout";
import { SimilarShow } from "@/components/layouts/similar-show";
import { ShowDetails } from "@/components/layouts/show-details";
import { changeMovieState, modalState } from "~/atoms/jotaiAtoms";

const DynamicModalVideo = dynamic(
  () => import("@/components/layouts/modal-video"),
  { ssr: false },
);

export default function MovieDetails({ movie }: { movie: Movie }) {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [showModal, setShowModal] = useAtom(modalState);

  React.useEffect(() => {
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.id]);

  const playTrailer = () => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  return (
    <RootLayout
      title={movie.title}
      image={`${imageOg}${movie.backdrop_path}`}
      description={movie.overview}
    >
      <div className="relative flex aspect-video w-full items-center justify-center object-cover brightness-50 sm:h-[56.25vw]">
        <span className="absolute left-[20%] top-[14%] z-10 hidden cursor-default font-mono text-xl sm:block md:text-[2vw]">
          {movie.tagline}
        </span>
        {movie.backdrop_path !== null || movie.poster_path !== null ? (
          <NextImage
            src={`${imgUrl}/original${movie.backdrop_path || movie.poster_path}`}
            className="bg-black/25"
            alt={`Banner ${movie.title}`}
            priority
          />
        ) : (
          <div className="absolute">
            <p className="z-[-1] -rotate-6 text-[4vw] text-red-600">
              background not available!
            </p>
          </div>
        )}
        <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-[#5f5f5f]" />
      </div>
      <ShowDetails show={movie} playFunc={playTrailer} />
      <div className="relative mx-auto max-w-7xl space-y-8">
        <Keywords type="movie" keyword={movie.id} />
        <SimilarShow type="movie" similar={movie.id} />
      </div>
      {showModal && <DynamicModalVideo showDetail={false} />}
    </RootLayout>
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
      `https://api.themoviedb.org/3/movie/${movieId}`,
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
