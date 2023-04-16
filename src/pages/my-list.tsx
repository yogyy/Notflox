import Navbar from '@/components/navbar';
import Banner from '@/components/netflix1/Banner';
import { RowLanscape, RowPotrait } from '@/components/netflix1/Row';
import requests from '@/utils/request';
import Head from 'next/head';
import { Movie } from '../../typing';
import { useRecoilValue } from 'recoil';
import * as React from 'react';
import Modal from '@/components/netflix1/ModalVid';
import { modalState } from '../../atoms/modalAtom';

interface Props {
  trendingNow: Movie[];
}

const Movies = ({ trendingNow }: Props) => {
  // const showModal = useRecoilValue();
  const showModal = useRecoilValue(modalState);
  return (
    <>
      <Head>
        <title>Netflix Clone</title>
      </Head>
      <Navbar />
      <div className="main">
        <main>
          <Banner netflixOriginals={trendingNow} />
        </main>
      </div>
    </>
  );
};

export default Movies;

export const getServerSideProps = async () => {
  const [trendingNow] = await Promise.all([
    fetch(requests.fetchTrending).then(res => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
    },
  };
};
