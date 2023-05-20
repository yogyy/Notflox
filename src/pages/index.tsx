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
import { GetServerSidePropsContext } from 'next';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Session {
  user: User;
  expires: string;
}

const Movies = (session: Session) => {
  const [showModal, setShowModal] = useAtom(modalState);

  React.useEffect(() => {
    setShowModal(false);
  }, []);

  const { data: trendingNetflix, isLoading: loadingTrending } = useQuery(
    ['fetchTrending'],
    () => axios.get(requests.fetchTrendingNetflix).then(res => res.data.results)
  );
  const { data: topRatedNetflix, isLoading: loadingToprated } = useQuery<
    Movie[] | undefined
  >(['TopRatedNetflix'], () =>
    axios.get(requests.fetchTopRatedNetflix).then(res => res.data.results)
  );
  const { data: airToday, isLoading: loadingAirtdy } = useQuery<
    Movie[] | undefined
  >(['AirToday'], () =>
    axios.get(requests.fetchAirToday).then(res => res.data.results)
  );
  const { data: popularNetflix, isLoading: loadingPopular } = useQuery<
    Movie[] | undefined
  >(['PopularNetflix'], () =>
    axios.get(requests.fetchPopularNetflix).then(res => res.data.results)
  );

  return (
    <RootLayout title="Netflix Clone">
      {session !== null ? (
        <>
          <div className="main">
            <section>
              {loadingTrending ? (
                <div className="relative h-[56.25vw] mb-10">
                  <Loading />
                </div>
              ) : (
                <Banner banner={trendingNetflix?.slice(0, 5)} />
              )}
            </section>
            <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-72 max-w-[1300px] z-[2]">
              {loadingTrending ? (
                <RowLanscapeLoading />
              ) : (
                <RowLanscape
                  className=""
                  title="Trending Now"
                  movies={trendingNetflix!}
                />
              )}
              {loadingAirtdy ? (
                <RowPotraitLoading />
              ) : (
                <div className="">
                  {airToday?.length !== 0 && (
                    <div className="">
                      <h2 className="ml-5 text-sm font-semibold transition duration-200 w-fit md:text-2xl">
                        Released Today
                      </h2>
                      <div className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5 px-2">
                        {airToday?.map((movie: Movie) => (
                          <div key={movie.id} className="mt-1">
                            <ThumbnailPotrait movie={movie} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {loadingToprated ? (
                <RowPotraitLoading />
              ) : (
                <RowPotrait
                  className="text-primary"
                  title="Top Rated"
                  movies={topRatedNetflix!}
                />
              )}
              {loadingPopular ? (
                <RowLanscapeLoading />
              ) : (
                <RowLanscape
                  className=""
                  title="Popular Show"
                  movies={popularNetflix!}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
