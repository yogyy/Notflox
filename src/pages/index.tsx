import Banner from '@/components/netflix1/Banner';
import {
  RowLanscapeLoading,
  RowLanscape,
  RowPotrait,
  RowPotraitLoading,
} from '@/components/netflix1/Row';
import requests from '@/utils/request';
import { Movie } from '../../typing';
import * as React from 'react';
import ModalVid from '@/components/netflix1/ModalVid';
import { getSession, useSession } from 'next-auth/react';
import { ThumbnailPotrait } from '@/components/netflix1/Thumbnail';
import RootLayout from '@/components/layouts/layout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoaderBlock from '@/components/loader/loaderblock';
import Loading from '@/components/loader/loading';
import { useAtom } from 'jotai';
import { modalState } from '../../atoms/jotaiAtoms';

interface Props {
  trendingNetflix: Movie[];
}

const Movies = ({ trendingNetflix }: Props) => {
  const [showModal, setShowModal] = useAtom(modalState);
  const { data: session } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [router, session]);

  React.useEffect(() => {
    setShowModal(false);
  }, []);

  // const { data: topRatedNetflix, isLoading: loadingToprated } = useQuery<
  //   Movie[] | undefined
  // >(['TopRatedNetflix'], () =>
  //   axios.get(requests.fetchTopRatedNetflix).then(res => res.data.results));
  // const { data: airToday, isLoading: loadingAirtdy } = useQuery<
  //   Movie[] | undefined
  // >(['AirToday'], () =>
  //   axios.get(requests.fetchAirToday).then(res => res.data.results)
  // );
  // const { data: popularNetflix, isLoading: loadingPopular } = useQuery<
  //   Movie[] | undefined
  // >(['PopularNetflix'], () =>
  //   axios.get(requests.fetchPopularNetflix).then(res => res.data.results)
  // );

  const { data: notflox, isLoading: LoadingNotflox } = useQuery(
    ['fetchNotflox'],
    () => axios.get('/api/notflox').then(res => res.data)
  );

  return (
    <RootLayout title="Netflix Clone">
      {session !== null ? (
        <>
          <div className="main">
            <section>
              {LoadingNotflox ? (
                <div className="relative h-[56.25vw] mb-10">
                  <Loading />
                </div>
              ) : (
                <Banner banner={trendingNetflix?.slice(0, 5)} />
              )}
            </section>
            <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-72 max-w-[1300px] z-[2]">
              {LoadingNotflox ? (
                <RowPotraitLoading />
              ) : (
                <RowLanscape
                  className=""
                  title="Trending Now"
                  movies={trendingNetflix!}
                />
              )}
              {LoadingNotflox ? (
                <RowPotraitLoading />
              ) : (
                <div className="">
                  {notflox.airToday?.length !== 0 && (
                    <div className="">
                      <h2 className="ml-5 text-sm font-semibold transition duration-200 w-fit md:text-2xl">
                        Released Today
                      </h2>
                      <div className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5 px-2">
                        {notflox.airToday?.map((movie: Movie) => (
                          <div key={movie.id} className="mt-1">
                            <ThumbnailPotrait movie={movie} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {LoadingNotflox ? (
                <RowPotraitLoading />
              ) : (
                <RowPotrait
                  className="text-primary"
                  title="Top Rated"
                  movies={notflox.topRatedNetflix}
                />
              )}
              {LoadingNotflox ? (
                <RowLanscapeLoading />
              ) : (
                <RowLanscape
                  className=""
                  title="Popular Show"
                  movies={notflox.popularNetflix}
                />
              )}
            </section>
          </div>
          {showModal && <ModalVid showDetail={true} />}
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
};

export default Movies;

export const getStaticProps = async () => {
  const trendingNetflix = await fetch(requests.fetchTrendingNetflix).then(res =>
    res.json()
  );
  return {
    props: {
      trendingNetflix: trendingNetflix.results,
    },
    revalidate: 3600,
  };
};
