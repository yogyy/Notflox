import Navbar from '@/components/navbar';
import Banner from '@/components/netflix1/Banner';
import { RowLanscape, RowPotrait } from '@/components/netflix1/Row';
import requests, { API_KEY, BASE_URL } from '@/utils/request';
import Head from 'next/head';
import { Movie } from '../../typing';
import { useRecoilValue } from 'recoil';
import * as React from 'react';
import ModalVid from '@/components/netflix1/ModalVid';
import { modalState } from '../../atoms/modalAtom';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { ThumbnailPotrait } from '@/components/netflix1/Thumbnail';

interface Props {
  discoverMovie: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  upComing: Movie[];
  Animation: Movie[];
}

const Movies = ({
  discoverMovie,
  actionMovies,
  Animation,
  topRated,
  upComing,
  trendingNow,
}: Props) => {
  const showModal = useRecoilValue(modalState);
  const [discoverNetflix, setDiscoverNetflix] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const discoverNetflixRequest = axios.get(`${BASE_URL}/tv/popular`, {
        params: {
          api_key: API_KEY,
          include_adult: false,
          page: 1,
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
          <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-72 max-w-[1300px]">
            <RowLanscape
              className=""
              title="Trending Now Netflix"
              movies={trendingNow}
            />
            {/* <RowPotrait title="Trending Tv" movies={NetflixOriginals} /> */}
            <div className="">
              <h2 className="w-56 ml-5 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                Released Today
              </h2>
              <div className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5 px-2">
                {upComing.map(movie => (
                  <div key={movie.id} className="mt-1">
                    <ThumbnailPotrait movie={movie} />
                  </div>
                ))}
              </div>
            </div>
            <RowPotrait title="Top Rated Netflix" movies={topRated} />
            <RowLanscape className="" title="Animations" movies={Animation} />
            <RowPotrait title="Actions" movies={actionMovies} />
          </section>
        </main>
        {showModal && <ModalVid />}
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
    Animation,
  ] = await Promise.all([
    fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&include_adult=false&page=1&year=2023&without_genres=10749&with_networks=213&append_to_response=videos`
    ).then(res => res.json()),
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US&with_networks=213`
    ).then(res => res.json()),
    fetch(requests.fetchTopRatedNetflix).then(res => res.json()),
    fetch(requests.fetchActionTvNetflix).then(res => res.json()),
    fetch(requests.fetchComedyMovies).then(res => res.json()),
    fetch(requests.fetchHorrorMovies).then(res => res.json()),
    fetch(requests.fetchAirToday).then(res => res.json()),
    fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_networks=213&with_genres=16`
    ).then(res => res.json()),
  ]);

  return {
    props: {
      discoverMovie: discoverMovie.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      upComing: upComing.results,
      Animation: Animation.results,
    },
  };
};
