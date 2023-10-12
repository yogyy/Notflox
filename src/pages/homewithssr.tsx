import Banner from '@/components/layouts/banner';
import requests from '@/utils/request';
import { Movie } from '~/typing';
import * as React from 'react';
import ModalVid from '@/components/layouts/modal-video';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import RootLayout from '@/components/layouts/layout';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { modalState } from '~/atoms/jotaiAtoms';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/layouts/swiper-show';

const HomeSsr = () => {
  const showModal = useAtom(modalState);

  const { data: trendingNetflix } = useQuery<Movie[] | undefined>(
    ['TrendingNetflix'],
    () => axios.get(requests.TrendingNetflix).then(res => res.data.results)
  );
  const { data: topRatedNetflix } = useQuery<Movie[] | undefined>(
    ['TopRatedNetflix'],
    () => axios.get(requests.TopRatedNetflix).then(res => res.data.results)
  );
  const { data: airToday } = useQuery<Movie[] | undefined>(['AirToday'], () =>
    axios.get(requests.NetflixAirToday).then(res => res.data.results)
  );
  const { data: popularNetflix } = useQuery<Movie[] | undefined>(
    ['PopularNetflix'],
    () => axios.get(requests.PopularNetflix).then(res => res.data.results)
  );
  return (
    <RootLayout title="Netflix Clone">
      <div className="main">
        <main>
          <section>
            <Banner banner={trendingNetflix?.slice(0, 5)} />
          </section>
          <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-72 max-w-7xl z-[2]">
            <SwiperLanscape
              title="Trending Now Netflix"
              movies={trendingNetflix!}
            />
            <SwiperPotrait movies={airToday} />
            <SwiperPotrait
              title="Top Rated Netflix"
              movies={topRatedNetflix!}
            />
            <SwiperLanscape title="Popular Show" movies={popularNetflix!} />
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
        .get(requests.TrendingNetflix)
        .then(res => res.data.results.slice(0, 10))
    ),
    queryClient.prefetchQuery(['TopRatedNetflix'], () =>
      axios
        .get(requests.TopRatedNetflix)
        .then(res => res.data.results.slice(0, 10))
    ),
    queryClient.prefetchQuery(['AirToday'], () =>
      axios
        .get(requests.NetflixAirToday)
        .then(res => res.data.results.slice(0, 10))
    ),
    queryClient.prefetchQuery(['PopularNetflix'], () =>
      axios
        .get(requests.PopularNetflix)
        .then(res => res.data.results.slice(0, 10))
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
