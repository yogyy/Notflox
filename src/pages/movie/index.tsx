import req from '@/utils/request';
import Banner from '@/components/layouts/banner';
import RootLayout from '@/components/layouts/layout';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/layouts/swiper-show';
import useMovies from '@/hooks/useCustomQuery';

const Movies = () => {
  const { data: trendingNow, isLoading: loadingTrending } = useMovies(
    ['movie-trending'],
    req.TrendingMovies
  );
  const { data: topRated, isLoading: loadingTopRated } = useMovies(
    ['movie-toprated'],
    req.TopRatedMovies
  );
  const { data: newRelease, isLoading: loadingNewRelease } = useMovies(
    ['movie-newreleased'],
    req.NowPlayingMovies
  );

  return (
    <RootLayout title="Movies" className="">
      <Banner banner={trendingNow?.slice(0, 10)} loading={loadingTrending} />
      <section className="space-y-7 mx-auto relative mt-5 md:mt-10 xl:-mt-64 max-w-7xl z-[2] pb-16">
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
    </RootLayout>
  );
};

export default Movies;
