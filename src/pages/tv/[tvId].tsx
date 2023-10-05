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
import { baseUrl, imageOg } from '~/constants/movie';
import { useAtom } from 'jotai';
import { changeMovieState, modalState } from '~/atoms/jotaiAtoms';
import { useRouter } from 'next/router';

interface TvProps {
  tv: Movie;
}

export default function TvDetails({ tv }: TvProps) {
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
        <>
          <div className="relative w-full sm:h-[56.25vw] object-cover aspect-video brightness-50">
            <span className="absolute top-[14%] left-[20%] text-xl md:text-[2vw] font-mono z-10 hidden sm:block cursor-default">
              {tv.tagline}
            </span>
            {tv.backdrop_path !== null ? (
              <Image
                src={`${baseUrl}${tv.backdrop_path || ''}`}
                className="bg-black/25"
                fill
                alt={`banner ${tv.name}`}
                priority
                draggable={false}
              />
            ) : (
              <div className="bg-ireng" />
            )}
            <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
          </div>
          <ShowDetails show={tv} playFunc={playTrailer} />
          <div className="space-y-12 md:space-y-10 mx-auto relative max-w-7xl">
            <Keywords type="tv" keyword={tv.id} />
            <Similars type="tv" similar={tv.id} />
          </div>
        </>
        {showModal && <ModalVid showDetail={false} />}
      </RootLayout>
    </React.Suspense>
  );
}

type Params = {
  params: {
    tvId: number;
  };
};

export async function getServerSideProps(context: Params) {
  const tvId = Number(context.params.tvId);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`
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
