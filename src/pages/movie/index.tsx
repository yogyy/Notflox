import req from "@/utils/request";
import RootLayout from "@/components/layouts/layout";
import {
  SwiperLanscape,
  SwiperPotrait,
} from "@/components/layouts/swiper-show";
import { useCustomQuery } from "@/hooks/use-custom-query";
import { Banner } from "@/components/layouts/banner";

const Movies = () => {
  const { data: trendingNow, isLoading: loadingTrending } = useCustomQuery(
    ["movie-trending"],
    req.TrendingMovies,
  );
  const { data: topRated, isLoading: loadingTopRated } = useCustomQuery(
    ["movie-toprated"],
    req.TopRatedMovies,
  );
  const { data: newRelease, isLoading: loadingNewRelease } = useCustomQuery(
    ["movie-newreleased"],
    req.NowPlayingMovies,
  );

  return (
    <RootLayout title="Movies">
      <Banner banner={trendingNow?.slice(0, 10)} loading={loadingTrending} />
      <section className="relative z-[2] mx-auto mt-5 max-w-7xl space-y-7 pb-16 md:mt-10 xl:-mt-64">
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
