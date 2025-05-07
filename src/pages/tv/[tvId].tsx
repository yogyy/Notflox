import { useEffect } from "react";
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

const DynamicModalVideo = dynamic(() => import("@/components/layouts/modal-video"), {
  ssr: false,
});

export default function TvDetails({ tv }: { tv: Movie }) {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [showModal, setShowModal] = useAtom(modalState);

  useEffect(() => {
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tv.id]);

  function playTrailer() {
    setCurrentMovie(tv);
    setShowModal(true);
  }

  return (
    <div key={tv.id} className="bg-background/60">
      <div className="relative flex aspect-video w-full items-center justify-center object-cover brightness-50 sm:h-[56.25vw]">
        <span className="absolute left-[20%] top-[14%] z-10 hidden cursor-default select-none font-mono text-xl sm:block md:text-[2vw]">
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
        <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-background" />
      </div>
      <ShowDetails show={tv} playFunc={playTrailer} />
      <div className="relative mx-auto max-w-7xl space-y-8">
        <Keywords type="tv" showId={tv.id} />
        <SimilarShow type="tv" showId={tv.id} genres={tv.genres} />
      </div>
      {showModal && <DynamicModalVideo showDetail={false} />}
    </div>
  );
}

TvDetails.getLayout = function getLayout(page: React.ReactElement<{ tv: Movie }>) {
  return (
    <RootLayout
      title={page.props.tv.name}
      image={`${imageOg}${page.props.tv.backdrop_path}`}
      description={page.props.tv.overview}
    >
      {page}
    </RootLayout>
  );
};

export async function getServerSideProps(ctx: { params: { tvId: string } }) {
  const tvId = parseInt(ctx.params?.tvId);
  if (!Number.isInteger(tvId)) {
    return { notFound: true };
  }

  try {
    const data = await fetcher<Movie>(`https://api.themoviedb.org/3/tv/${tvId}`);

    return { props: { tv: data } };
  } catch (err) {
    const error = err as AxiosError<Error>;
    if (error.response && error.response.status === 404) {
      return { notFound: true };
    }
  }
}
