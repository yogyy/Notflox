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
  console.log(trendingNow);
  return (
    <RootLayout title="Movies">
      <main>
        <Banner banner={trendingNow} />
        <section className="space-y-12 md:space-y-10 px-4 mx-auto top-[60%] tengah mt-10 z-[2]">
          <RowLanscape className="" title="Trending Now" movies={trendingNow} />
          <RowPotrait title="New Release" movies={comedyMovies} />
          <RowPotrait title="Top Rated" movies={topRated} />
        </section>
      </main>
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
  const [trendingNow, topRated, comedyMovies] = await Promise.all([
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchComedyMovies).then(res => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results.slice(0, 10),
      topRated: topRated.results.slice(0, 10),
      comedyMovies: comedyMovies.results.slice(0, 10),
    },
  };
};
