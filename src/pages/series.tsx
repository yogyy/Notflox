import Banner from '@/components/netflix1/Banner';
import requests from '@/utils/request';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Movie } from '../../typing';
import RootLayout from '@/components/layouts/layout';
import { RowLanscape, RowPotrait } from '@/components/netflix1/RowToPage';

interface Props {
  familyTv: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionTv: Movie[];
  SciFiTv: Movie[];
}

const Series = ({ actionTv, topRated, trendingNow, SciFiTv }: Props) => {
  return (
    <RootLayout title={'TV Show'}>
      <main>
        <Banner banner={trendingNow.slice(0, 5)} />
        <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-64 max-w-[1300px] z-[2]">
          <RowLanscape title="Top Rated" movies={topRated} />
          <RowPotrait title="Trending" movies={trendingNow} />
          <RowPotrait title="Sci-Fi & Fantasy" movies={SciFiTv} />
          <RowPotrait title="Action & Adventure" movies={actionTv} />
        </section>
      </main>
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

  const [familyTv, trendingNow, topRated, actionTv, SciFiTv] =
    await Promise.all([
      fetch(requests.fetchFamilyTv).then(res => res.json()),
      fetch(requests.fetchTrendingTv).then(res => res.json()),
      fetch(requests.fetchTopRatedTv).then(res => res.json()),
      fetch(requests.fetchActionTv).then(res => res.json()),
      fetch(requests.fetchMysteryTv).then(res => res.json()),
      fetch(requests.fetchSciFiTv).then(res => res.json()),
    ]);

  return {
    props: {
      familyTv: familyTv.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionTv: actionTv.results,
      SciFiTv: SciFiTv.results,
    },
  };
};
