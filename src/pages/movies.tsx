import Navbar from '@/components/navbar';
import Banner from '@/components/netflix1/Banner';
import { RowLanscape, RowPotrait } from '@/components/netflix1/Row';
import requests from '@/utils/request';
import Head from 'next/head';
import { Movie } from '../../typing';
import RootLayout from '@/components/layouts/layout';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../atoms/modalAtom';
import Modal from '@/components/netflix1/Modal';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
}

const Movies = ({
  actionMovies,
  comedyMovies,
  horrorMovies,
  topRated,
  trendingNow,
}: Props) => {
  const showModal = useRecoilValue(modalState);

  return (
    <RootLayout title="Movies">
      <main>
        <Banner netflixOriginals={horrorMovies} />
        <section className="space-y-12 md:space-y-10 px-4 mx-auto top-[60%] tengah mt-10">
          <RowLanscape className="" title="Trending Now" movies={trendingNow} />
          <RowPotrait title="New Release" movies={comedyMovies} />
          <RowPotrait title="Top Rated" movies={topRated} />
          <RowPotrait title="Action" movies={actionMovies} />
        </section>
      </main>
      {showModal && <Modal />}
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
  const [trendingNow, topRated, actionMovies, comedyMovies, horrorMovies] =
    await Promise.all([
      fetch(requests.fetchTrending).then(res => res.json()),
      fetch(requests.fetchTopRated).then(res => res.json()),
      fetch(requests.fetchActionMovies).then(res => res.json()),
      fetch(requests.fetchComedyMovies).then(res => res.json()),
      fetch(requests.fetchHorrorMovies).then(res => res.json()),
    ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
    },
  };
};
