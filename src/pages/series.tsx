import Banner from '@/components/netflix1/Banner';
import requests from '@/utils/request';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { Movie } from '../../typing';
import RootLayout from '@/components/layouts/layout';
import { RowLanscape, RowPotrait } from '@/components/netflix1/RowToPage';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  fetchNowPlaying: Movie[];
}

const Series = ({ topRated, trendingNow, fetchNowPlaying }: Props) => {
  return (
    <RootLayout title={'TV Show'}>
      <>
        <Banner banner={trendingNow.slice(0, 5)} />
        <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-64 max-w-[1300px] z-[2]">
          <RowLanscape title="Tv Show Trending" movies={trendingNow} />
          <RowPotrait title="Now Playing" movies={fetchNowPlaying} />
          <RowPotrait title="Top Rated Tv" movies={topRated} />
        </section>
      </>
    </RootLayout>
  );
};

export default Series;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  context.res && context.res.setHeader('Cache-Control', 'public, max-age=3600');

  const [trendingNow, topRated, fetchNowPlaying] = await Promise.all([
    fetch(requests.fetchTrendingTv).then(res => res.json()),
    fetch(requests.fetchTopRatedTv).then(res => res.json()),
    fetch(requests.fetchNowPlayingTv).then(res => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results.slice(0, 10),
      topRated: topRated.results.slice(0, 10),
      fetchNowPlaying: fetchNowPlaying.results.slice(0, 10),
    },
  };
};
