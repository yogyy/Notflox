import * as React from 'react';
import { useAtom } from 'jotai';
import { Movie } from '~/typing';
import dynamic from 'next/dynamic';
import { AxiosError } from 'axios';
import fetcher from '@/lib/fetcher';
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import Keywords from '@/components/keywords';
import NextImage from '@/components/next-image';
import { imageOg, imgUrl } from '~/constants/movie';
import RootLayout from '@/components/layouts/layout';
import Similars from '@/components/layouts/similar-show';
import LoaderBlock from '@/components/loader/loaderblock';
import ShowDetails from '@/components/layouts/show-details';
import { changeMovieState, modalState } from '~/atoms/jotaiAtoms';

const DynamicModalVideo = dynamic(
  () => import('@/components/layouts/modal-video'),
  { ssr: false }
);

export default function TvDetails({ tv }: { tv: Movie }) {
  const [, setCurrentMovie] = useAtom(changeMovieState);
  const [showModal, setShowModal] = useAtom(modalState);
  const { replace } = useRouter();

  React.useEffect(() => {
    replace(`${tv.id}?title=${kebabCase(tv.name)}`);
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tv.id]);

  const playTrailer = () => {
    setCurrentMovie(tv);
    setShowModal(true);
  };

  return (
    <React.Suspense fallback={<LoaderBlock />}>
      <RootLayout
        title={tv.name}
        image={`${imageOg}${tv.backdrop_path}`}
        description={tv.overview}>
        <div className="relative w-full sm:h-[56.25vw] object-cover aspect-video brightness-50">
          <span className="absolute top-[14%] left-[20%] text-xl md:text-[2vw] font-mono z-10 hidden sm:block cursor-default">
            {tv.tagline}
          </span>
          {tv.backdrop_path !== null ? (
            <NextImage
              src={`${imgUrl}/original${tv.backdrop_path || ''}`}
              className="bg-black/25"
              alt={`banner ${tv.name}`}
              priority
            />
          ) : (
            <div className="bg-ireng" />
          )}
          <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
        </div>
        <ShowDetails show={tv} playFunc={playTrailer} />
        <div className="relative mx-auto space-y-12 md:space-y-10 max-w-7xl">
          <Keywords type="tv" keyword={tv.id} />
          <Similars type="tv" similar={tv.id} />
        </div>
        {showModal && <DynamicModalVideo showDetail={false} />}
      </RootLayout>
    </React.Suspense>
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
      `https://api.themoviedb.org/3/tv/${tvId}`
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
