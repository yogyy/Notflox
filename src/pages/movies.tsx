import Banner from '@/components/netflix1/Banner';
import requests from '@/utils/request';
import { Movie } from '../../typing';
import RootLayout from '@/components/layouts/layout';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { RowLanscape, RowPotrait } from '@/components/netflix1/RowToPage';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  comedyMovies: Movie[];
}

const Movies = ({ comedyMovies, topRated, trendingNow }: Props) => {
  return (
    <RootLayout title="Movies">
      <>
        <Banner banner={trendingNow.slice(0, 5)} />
        <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-64 max-w-[1300px] z-[2]">
          <RowLanscape className="" title="Trending Now" movies={trendingNow} />
          <RowPotrait title="New Release" movies={comedyMovies} />
          <RowPotrait title="Top Rated" movies={topRated} />
        </section>
      </>
    </RootLayout>
  );
};

export default Movies;

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

  const [trendingNow, topRated, comedyMovies] = await Promise.all([
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchNowPlaying).then(res => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results.slice(0, 10),
      topRated: topRated.results.slice(0, 10),
      comedyMovies: comedyMovies.results.slice(0, 10),
    },
  };
};
