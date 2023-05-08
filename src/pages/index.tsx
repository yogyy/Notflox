import Banner from '@/components/netflix1/Banner';
import { RowLanscape, RowPotrait } from '@/components/netflix1/Row';
import requests, { API_KEY, BASE_URL } from '@/utils/request';
import { Movie } from '../../typing';
import { useRecoilValue } from 'recoil';
import * as React from 'react';
import ModalVid from '@/components/netflix1/ModalVid';
import { modalState } from '../../atoms/modalAtom';
import { useSession } from 'next-auth/react';
import { ThumbnailPotrait } from '@/components/netflix1/Thumbnail';
import RootLayout from '@/components/layouts/layout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoaderBlock from '@/components/loader/loaderblock';

const Movies = () => {
  const { data: session } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [router, session]);

  const showModal = useRecoilValue(modalState);

  const { data: trendingNetflix, isLoading: loadingNetflix } = useQuery<
    Movie[] | undefined
  >(['TrendingNetflix'], () =>
    axios.get(requests.fetchTrendingNetflix).then(res => res.data.results)
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
      {!session ? (
        <LoaderBlock />
      ) : (
        <>
          {loadingToprated ||
          loadingNetflix ||
          loadingAirtdy ||
          loadingPopular ? (
            <LoaderBlock />
          ) : (
            <div className="main">
              <section>
                <Banner banner={trendingNetflix?.slice(0, 5)} />
              </section>
              <section className="space-y-12 md:space-y-10 mx-auto relative xl:-mt-72 max-w-[1300px] z-[2]">
                <RowLanscape
                  className=""
                  title="Trending Now"
                  movies={trendingNetflix!}
                />
                {airToday?.length !== 0 && (
                  <div className="">
                    <h2 className="w-56 ml-5 cursor-pointer text-sm font-semibold text-primary transition duration-200 hover:text-primary/60 md:text-2xl">
                      Released Today
                    </h2>
                    <div className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-2.5 px-2">
                      {airToday?.map(movie => (
                        <div key={movie.id} className="mt-1">
                          <ThumbnailPotrait movie={movie} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <RowPotrait
                  className="text-primary"
                  title="Top Rated"
                  movies={topRatedNetflix!}
                />
                <RowLanscape
                  className=""
                  title="Popular Show"
                  movies={popularNetflix!}
                />
              </section>
            </div>
          )}
          {showModal && <ModalVid />}
        </>
      )}
    </RootLayout>
  );
};

export default Movies;
