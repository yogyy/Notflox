import Banner from '@/components/netflix1/Banner';
import requests from '@/utils/request';
import { Movie } from '../../typing';
import RootLayout from '@/components/layouts/layout';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { RowLanscape, RowPotrait } from '@/components/netflix1/RowToPage';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  comedyMovies: Movie[];
}

const Movies = () => {
  const { data: trending } = useQuery<Movie[] | undefined>(
    ['trendingNow'],
    fetchTreding
  );
  const { data: toprated } = useQuery<Movie[] | undefined>(
    ['topRated'],
    fetchTopRated
  );
  const { data: newrelease } = useQuery<Movie[] | undefined>(
    ['newRelease'],
    fetchNewRelease
  );

  return (
    <RootLayout title="Movies">
      <>
        <div className="">
          <Banner banner={trending} />
        </div>
        <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-64 max-w-[1300px] z-[2]">
          <RowLanscape className="" title="Trending Now" movies={trending!} />
          <RowPotrait title="New Release" movies={newrelease!} />
          <RowPotrait title="Top Rated" movies={toprated!} />
        </section>
      </>
    </RootLayout>
  );
};

export default Movies;

async function fetchTreding() {
  const res = await axios.get(requests.fetchTrending);
  const dataTrend = await res.data.results.slice(0, 5);
  return dataTrend;
}

async function fetchTopRated() {
  const res = await axios.get(requests.fetchTopRated);
  const dataTrend = await res.data.results.slice(0, 10);
  return dataTrend;
}
async function fetchNewRelease() {
  const res = await axios.get(requests.fetchNowPlaying);
  const dataTrend = await res.data.results.slice(0, 10);
  return dataTrend;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['trendingNow'], fetchTreding),
    queryClient.prefetchQuery(['topRated'], fetchTopRated),
    queryClient.prefetchQuery(['newRelease'], fetchNewRelease),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
