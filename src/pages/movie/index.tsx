import axios from 'axios';
import Banner from '@/components/layouts/Banner';
import LoaderBlock from '@/components/loader/loaderblock';
import requests from '@/utils/request';
import RootLayout from '@/components/layouts/layout';
import { SwiperLanscape, SwiperPotrait } from '@/components/layouts/Swipe';
import { useSession } from 'next-auth/react';
import { Movie } from '~/typing';
import { useQuery } from '@tanstack/react-query';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  newRelease: Movie[];
}

const Movies = () => {
  const { data: session } = useSession();

  const { data: trendingNow, isLoading: loadingTrending } = useQuery<Movie[]>(
    ['movie-trending'],
    () => axios.get(requests.fetchTrending).then(res => res.data.results)
  );
  const { data: topRated, isLoading: loadingTopRated } = useQuery<Movie[]>(
    ['movie-toprated'],
    () => axios.get(requests.fetchTopRated).then(res => res.data.results)
  );
  const { data: newRelease, isLoading: loadingNewRelease } = useQuery<Movie[]>(
    ['movie-newreleased'],
    () => axios.get(requests.fetchNowPlaying).then(res => res.data.results)
  );

  return (
    <RootLayout title="Movies" className="">
      {session ? (
        <>
          <Banner
            banner={trendingNow?.slice(0, 10)}
            loading={loadingTrending}
          />
          <section className="space-y-7 mx-auto relative mt-10 xl:-mt-64 max-w-7xl z-[2] pb-16">
            <SwiperPotrait
              type="to-page"
              title="Trending Movies"
              movies={trendingNow?.slice(0, 10)}
              loading={loadingTrending}
            />
            <SwiperPotrait
              type="to-page"
              title="Newly Released Movies"
              movies={newRelease}
              loading={loadingNewRelease}
            />
            <SwiperLanscape
              type="to-page"
              title="Top Rated Movies"
              movies={topRated?.slice(0, 10)}
              loading={loadingTopRated}
            />
          </section>
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
};

export default Movies;
