import Navbar from '@/components/navbar';
import Banner from '@/components/netflix1/Banner';
import { RowLanscape, RowPotrait } from '@/components/netflix1/Row';
import requests, { API_KEY, BASE_URL } from '@/utils/request';
import Head from 'next/head';
import { Movie } from '../../typing';
import { useRecoilValue } from 'recoil';
import * as React from 'react';
import Modal from '@/components/netflix1/Modal';
import { modalState } from '../../atoms/modalAtom';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';

interface Props {
  discoverMovie: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  upComing: Movie[];
}

const Movies = ({
  discoverMovie,
  actionMovies,
  comedyMovies,
  horrorMovies,
  topRated,
  upComing,
}: Props) => {
  // const showModal = useRecoilValue();
  const showModal = useRecoilValue(modalState);
  const [discoverNetflix, setDiscoverNetflix] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const discoverNetflixRequest = axios.get(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          include_adult: false,
          page: 1,
          year: 2023,
          without_genres: 10749,
          with_networks: 213,
          language: 'en-US',
        },
      });

      const [discoverNetflixResponse] = await Promise.all([
        discoverNetflixRequest,
      ]);

      setDiscoverNetflix((await discoverNetflixResponse).data.results);
    }
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Netflix Clone</title>
      </Head>
      <Navbar />
      <div className="main">
        <main>
          <Banner netflixOriginals={discoverMovie} />
          <section className="space-y-12 md:space-y-10 mx-auto relative md:-mt-72 max-w-[1300px]">
            <RowLanscape
              className=""
              title="Trending Now Netflix"
              movies={discoverNetflix}
            />
            {/* <RowPotrait title="Trending Tv" movies={NetflixOriginals} /> */}
            <div className="">
              <RowPotrait title="Released Today" movies={upComing} />
            </div>
            <RowPotrait title="Top Rated Tv" movies={topRated} />
            <RowLanscape
              className=""
              title="comedyMovies"
              movies={horrorMovies}
            />
            <RowPotrait title="Action Tv" movies={actionMovies} />
          </section>
        </main>
        {showModal && <Modal />}
      </div>
    </>
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
  const [
    discoverMovie,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    upComing,
  ] = await Promise.all([
    fetch(requests.fetchDiscoverMovie).then(res => res.json()),
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchActionMovies).then(res => res.json()),
    fetch(requests.fetchComedyMovies).then(res => res.json()),
    fetch(requests.fetchHorrorMovies).then(res => res.json()),
    fetch(requests.fetchAirToday).then(res => res.json()),
  ]);

  return {
    props: {
      discoverMovie: discoverMovie.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      upComing: upComing.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
    },
  };
};
