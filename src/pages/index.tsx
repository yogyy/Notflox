import Banner from '@/components/netflix1/Banner';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/netflix1/SwiperPlayTrailer';
import requests from '@/utils/request';
import { Movie } from '../../typing';
import * as React from 'react';
import ModalVid from '@/components/netflix1/ModalVid';
import { getSession } from 'next-auth/react';
import { ThumbnailPotrait } from '@/components/netflix1/Thumbnail';
import RootLayout from '@/components/layouts/layout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoaderBlock from '@/components/loader/loaderblock';
import Loading from '@/components/loader/loading';
import { useAtom } from 'jotai';
import { modalState } from '../../atoms/jotaiAtoms';
import { GetServerSidePropsContext } from 'next';
import {
  SwiperLanscapeLoading,
  SwiperPotraitLoading,
} from '@/components/loader/swiperloader';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
  expires: string;
}

const Movies = (session: Session) => {
  const [showModal, setShowModal] = useAtom(modalState);

  React.useEffect(() => {
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: trendingNetflix, isLoading: loadingTrending } = useQuery(
    ['fetchTrending'],
    () =>
      axios.get(requests.fetchTrendingNetflix).then(res => res.data.results),
    {
      cacheTime: 1800000,
      staleTime: 600000,
    }
  );
  const { data: topRatedNetflix, isLoading: loadingToprated } = useQuery<
    Movie[] | undefined
  >(
    ['TopRatedNetflix'],
    () =>
      axios.get(requests.fetchTopRatedNetflix).then(res => res.data.results),
    {
      cacheTime: 1800000,
      staleTime: 600000,
    }
  );
  const { data: airToday, isLoading: loadingAirtdy } = useQuery<
    Movie[] | undefined
  >(
    ['AirToday'],
    () => axios.get(requests.fetchAirToday).then(res => res.data.results),
    {
      cacheTime: 1800000,
      staleTime: 600000,
    }
  );
  const { data: popularNetflix, isLoading: loadingPopular } = useQuery<
    Movie[] | undefined
  >(
    ['PopularNetflix'],
    () => axios.get(requests.fetchPopularNetflix).then(res => res.data.results),
    {
      cacheTime: 1800000,
      staleTime: 600000,
    }
  );

  return (
    <RootLayout title="Netflix Clone">
      {session !== null ? (
        <>
          <div className="main">
            <section>
              {loadingTrending ? (
                <div className="relative h-[56.25vw] mb-10">
                  <Loading />
                </div>
              ) : (
                <Banner banner={trendingNetflix?.slice(0, 5)} />
              )}
            </section>
            <section className="space-y-7 mx-auto relative xl:-mt-72 max-w-[1300px] z-[2]">
              {loadingTrending ? (
                <SwiperLanscapeLoading />
              ) : (
                <SwiperLanscape
                  className=""
                  title="Trending Now"
                  movies={trendingNetflix!}
                />
              )}
              {loadingAirtdy ? (
                <SwiperPotraitLoading />
              ) : (
                <div className="">
                  {airToday?.length !== 0 && (
                    <div className="">
                      <h2 className="ml-5 text-sm font-semibold transition duration-200 w-fit md:text-2xl">
                        Released Today
                      </h2>
                      <div className="flex items-center gap-2 px-2 space-x-3 w-fit containermoviecard">
                        {airToday?.map((movie: Movie) => (
                          <div key={movie.id} className="mt-1 moviecard">
                            <ThumbnailPotrait
                              className="md:w-[158.63px]"
                              movie={movie}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {loadingToprated ? (
                <SwiperPotraitLoading />
              ) : (
                <SwiperPotrait title="Top Rated" movies={topRatedNetflix!} />
              )}
              {loadingPopular ? (
                <SwiperLanscapeLoading />
              ) : (
                <SwiperLanscape
                  className=""
                  title="Popular Show"
                  movies={popularNetflix!}
                />
              )}
            </section>
          </div>
          {showModal && <ModalVid showDetail={true} />}
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
};

export default Movies;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
