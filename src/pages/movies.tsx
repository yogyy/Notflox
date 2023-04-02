import Navbar from '@/components/navbar';
import Banner from '@/components/netflix1/Banner';
import { RowLanscape, RowPotrait } from '@/components/netflix1/Row';
import requests from '@/utils/request';
import Head from 'next/head';
import { Movie } from '../../typing';
import RootLayout from '@/components/layouts/layout';

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
  trendingNow,
  upComing,
}: Props) => {
  return (
    <RootLayout>
      <Banner netflixOriginals={discoverMovie} />

      <section className="space-y-12 md:space-y-10 px-4 mx-auto top-[60%] tengah mt-10">
        <RowLanscape className="" title="Trending Now" movies={trendingNow} />
        <RowPotrait title="New Release" movies={upComing} />
        <RowPotrait title="Top Rated" movies={topRated} />
        <RowPotrait title="Action" movies={actionMovies} />
      </section>
    </RootLayout>
  );
};

export default Movies;

export const getServerSideProps = async () => {
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
    fetch(requests.fetchUpComing).then(res => res.json()),
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
