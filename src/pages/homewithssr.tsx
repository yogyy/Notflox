import Banner from '@/components/netflix1/Banner';

import requests from '@/utils/request';
import { Movie } from '../../typing';
import * as React from 'react';
import ModalVid from '@/components/netflix1/ModalVid';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { ThumbnailPotrait } from '@/components/netflix1/Thumbnail';
import RootLayout from '@/components/layouts/layout';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { modalState } from '../../atoms/jotaiAtoms';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/netflix1/SwiperPlayTrailer';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  romanceMovies: Movie[];
  upComing: Movie[];
  Animation: Movie[];
}

const HomeSsr = () => {
  const showModal = useAtom(modalState);

  const { data: trendingNetflix } = useQuery<Movie[] | undefined>(
    ['TrendingNetflix'],
    () => axios.get(requests.fetchTrendingNetflix).then(res => res.data.results)
  );
  const { data: topRatedNetflix } = useQuery<Movie[] | undefined>(
    ['TopRatedNetflix'],
    () => axios.get(requests.fetchTopRatedNetflix).then(res => res.data.results)
  );
  const { data: airToday } = useQuery<Movie[] | undefined>(['AirToday'], () =>
    axios.get(requests.fetchAirToday).then(res => res.data.results)
  );
  const { data: popularNetflix } = useQuery<Movie[] | undefined>(
    ['PopularNetflix'],
    () => axios.get(requests.fetchPopularNetflix).then(res => res.data.results)
  );
  return (
    <RootLayout title="Netflix Clone">
      <div className="main">
        <main>
          <section>
            <Banner banner={trendingNetflix?.slice(0, 5)} />
          </section>
          <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-72 max-w-[1300px] z-[2]">
            <SwiperLanscape
              className=""
              title="Trending Now Netflix"
              movies={trendingNetflix!}
            />
            {airToday?.length !== 0 && (
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
            <SwiperPotrait
              title="Top Rated Netflix"
              movies={topRatedNetflix!}
            />
            <SwiperLanscape
              className=""
              title="Popular Show"
              movies={popularNetflix!}
            />
          </section>
        </main>
        {showModal && <ModalVid />}
      </div>
    </RootLayout>
  );
};

export default HomeSsr;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);
  const queryClient = new QueryClient();

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  await Promise.all([
    queryClient.prefetchQuery(['TrendingNetflix'], () =>
      axios
        .get(requests.fetchTrendingNetflix)
        .then(res => res.data.results.slice(0, 10))
    ),
    queryClient.prefetchQuery(['TopRatedNetflix'], () =>
      axios
        .get(requests.fetchTopRatedNetflix)
        .then(res => res.data.results.slice(0, 10))
    ),
    queryClient.prefetchQuery(['AirToday'], () =>
      axios
        .get(requests.fetchAirToday)
        .then(res => res.data.results.slice(0, 10))
    ),
    queryClient.prefetchQuery(['PopularNetflix'], () =>
      axios
        .get(requests.fetchPopularNetflix)
        .then(res => res.data.results.slice(0, 10))
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
