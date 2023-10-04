import axios from 'axios';
import Banner from '@/components/layouts/Banner';
import LoaderBlock from '@/components/loader/loaderblock';
import ModalVid from '@/components/layouts/ModalVid';
import requests from '@/utils/request';
import RootLayout from '@/components/layouts/layout';
import { useEffect } from 'react';
import { SwiperLanscape, SwiperPotrait } from '@/components/layouts/Swipe';
import { Movie } from '~/typing';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { modalState } from '~/atoms/jotaiAtoms';

const Notflox = () => {
  const [showModal, setShowModal] = useAtom(modalState);
  const { data: session } = useSession();

  useEffect(() => {
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: trendingNetflix, isLoading: loadingTrending } = useQuery<
    Movie[]
  >(['fetchTrending'], () =>
    axios.get(requests.fetchTrendingNetflix).then(res => res.data.results)
  );
  const { data: topRatedNetflix, isLoading: loadingToprated } = useQuery<
    Movie[]
  >(['TopRatedNetflix'], () =>
    axios.get(requests.fetchTopRatedNetflix).then(res => res.data.results)
  );
  const { data: airToday, isLoading: loadingAirtdy } = useQuery<Movie[]>(
    ['AirToday'],
    () => axios.get(requests.fetchAirToday).then(res => res.data.results)
  );
  const { data: popularNetflix, isLoading: loadingPopular } = useQuery<Movie[]>(
    ['PopularNetflix'],
    () => axios.get(requests.fetchPopularNetflix).then(res => res.data.results)
  );

  const allLoading =
    loadingTrending || loadingToprated || loadingAirtdy || loadingPopular;
  return (
    <RootLayout title="Home">
      {session ? (
        <>
          <Banner loading={allLoading} banner={trendingNetflix?.slice(0, 10)} />
          <section className="space-y-7 mx-auto relative mt-10 xl:-mt-64 max-w-7xl z-[2] pb-16">
            <SwiperPotrait
              title="Trending Now"
              movies={trendingNetflix}
              loading={loadingTrending}
              type="play"
            />
            <SwiperPotrait
              title="New Releases"
              movies={airToday}
              loading={loadingAirtdy}
              type="play"
            />
            <SwiperPotrait
              title="Top Picks for You"
              movies={topRatedNetflix?.slice(0, 10)}
              loading={loadingToprated}
              type="play"
            />
            <SwiperLanscape
              title="Popular on Netflix"
              movies={popularNetflix}
              loading={loadingPopular}
              type="play"
            />
          </section>
        </>
      ) : (
        <LoaderBlock />
      )}
      {showModal && <ModalVid showDetail={true} />}
    </RootLayout>
  );
};

export default Notflox;
