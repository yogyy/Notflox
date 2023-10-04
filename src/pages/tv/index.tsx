import axios from 'axios';
import Banner from '@/components/layouts/Banner';
import requests from '@/utils/request';
import RootLayout from '@/components/layouts/layout';
import LoaderBlock from '@/components/loader/loaderblock';
import { useSession } from 'next-auth/react';
import { SwiperLanscape, SwiperPotrait } from '@/components/layouts/Swipe';
import { Movie } from '~/typing';
import { useQuery } from '@tanstack/react-query';

const Tv = () => {
  const { data: session } = useSession();

  const { data: trendingNow, isLoading: loadingTrending } = useQuery<Movie[]>(
    ['fetchTrending'],
    () => axios.get(requests.fetchTrendingTv).then(res => res.data.results)
  );
  const { data: fetchNowPlaying, isLoading: loadingNowPlay } = useQuery<
    Movie[]
  >(['tv-nowplaying'], () =>
    axios.get(requests.fetchNowPlayingTv).then(res => res.data.results)
  );
  const { data: topRated, isLoading: loadingTopRated } = useQuery<Movie[]>(
    ['tv-toprated'],
    () => axios.get(requests.fetchTopRatedTv).then(res => res.data.results)
  );

  return (
    <RootLayout title={'TV Show'}>
      {session ? (
        <>
          <Banner
            banner={trendingNow?.slice(0, 10)}
            loading={loadingTrending}
          />
          <section className="space-y-7 mx-auto relative mt-10 xl:-mt-64 max-w-7xl z-[2] pb-16">
            <SwiperPotrait
              title="TV Shows Trending"
              movies={trendingNow?.slice(0, 10)}
              loading={loadingTrending}
              type="to-page"
            />
            <SwiperPotrait
              title="TV Shows Now Playing"
              movies={fetchNowPlaying}
              loading={loadingNowPlay}
              type="to-page"
            />
            <SwiperLanscape
              title="TV Shows Top Rated"
              movies={topRated?.slice(0, 10)}
              loading={loadingTopRated}
              type="to-page"
            />
          </section>
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
};

export default Tv;
