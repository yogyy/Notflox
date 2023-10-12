import req from '@/utils/request';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/layouts/swiper-show';
import useTvShow from '@/hooks/useCustomQuery';
import Banner from '@/components/layouts/banner';
import RootLayout from '@/components/layouts/layout';

const Tv = () => {
  const { data: trendingNow, isLoading: loadingTrending } = useTvShow(
    ['fetchTrending'],
    req.TrendingTv
  );
  const { data: fetchNowPlaying, isLoading: loadingNowPlay } = useTvShow(
    ['tv-nowplaying'],
    req.NowPlayingTv
  );
  const { data: topRated, isLoading: loadingTopRated } = useTvShow(
    ['tv-toprated'],
    req.TopRatedTv
  );

  return (
    <RootLayout title={'TV Show'}>
      <Banner banner={trendingNow?.slice(0, 10)} loading={loadingTrending} />
      <section className="space-y-7 mx-auto relative mt-5 md:mt-10 xl:-mt-64 max-w-7xl z-[2] pb-16">
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
    </RootLayout>
  );
};

export default Tv;
