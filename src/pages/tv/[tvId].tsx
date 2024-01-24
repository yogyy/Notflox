import * as React from "react";
import { useAtom } from "jotai";
import { Movie } from "~/types/tmdb-type";
import dynamic from "next/dynamic";
import { AxiosError } from "axios";
import { fetcher } from "@/lib/utils";
import { Keywords } from "@/components/keywords";
import { NextImage } from "@/components/next-image";
import { imageOg, imgUrl } from "~/constants/movie";
import RootLayout from "@/components/layouts/layout";
import { ShowDetails } from "@/components/layouts/show-details";
import { changeMovieState, modalState } from "~/atoms/jotaiAtoms";
import { SimilarShow } from "@/components/layouts/similar-show";

const DynamicModalVideo = dynamic(
  () => import("@/components/layouts/modal-video"),
  { ssr: false },
);

export default function TvDetails({ tv }: { tv: Movie }) {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [showModal, setShowModal] = useAtom(modalState);

  React.useEffect(() => {
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tv.id]);

  const playTrailer = () => {
    setCurrentMovie(tv);
    setShowModal(true);
  };

  return (
    <RootLayout
      title={tv.name}
      image={`${imageOg}${tv.backdrop_path}`}
      description={tv.overview}
    >
      <div className="relative flex aspect-video w-full items-center justify-center object-cover brightness-50 sm:h-[56.25vw]">
        <span className="absolute left-[20%] top-[14%] z-10 hidden cursor-default font-mono text-xl sm:block md:text-[2vw]">
          {tv.tagline}
        </span>
        {tv.backdrop_path !== null || tv.poster_path !== null ? (
          <NextImage
            src={`${imgUrl}/original${tv.backdrop_path || tv.poster_path}`}
            className="bg-black/25"
            alt={`banner ${tv.name}`}
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
      <ShowDetails show={tv} playFunc={playTrailer} />
      <div className="relative mx-auto max-w-7xl space-y-8">
        <Keywords type="tv" keyword={tv.id} />
        <SimilarShow type="tv" similar={tv.id} />
      </div>
      {showModal && <DynamicModalVideo showDetail={false} />}
    </RootLayout>
  );
}

export async function getServerSideProps(context: {
  params: {
    tvId: number;
  };
}) {
  const tvId = Number(context.params.tvId);

  try {
    const data = await fetcher<Movie>(
      `https://api.themoviedb.org/3/tv/${tvId}`,
    );
    return {
      props: {
        tv: data,
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
