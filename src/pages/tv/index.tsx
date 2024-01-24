import req from "@/utils/request";
import {
  SwiperLanscape,
  SwiperPotrait,
} from "@/components/layouts/swiper-show";
import { useCustomQuery } from "@/hooks/use-custom-query";
import { Banner } from "@/components/layouts/banner";
import RootLayout from "@/components/layouts/layout";

const Tv = () => {
  const { data: trendingNow, isLoading: loadingTrending } = useCustomQuery(
    ["fetchTrending"],
    req.TrendingTv,
  );
  const { data: fetchNowPlaying, isLoading: loadingNowPlay } = useCustomQuery(
    ["tv-nowplaying"],
    req.NowPlayingTv,
  );
  const { data: topRated, isLoading: loadingTopRated } = useCustomQuery(
    ["tv-toprated"],
    req.TopRatedTv,
  );

  return (
    <RootLayout title={"TV Show"}>
      <Banner banner={trendingNow?.slice(0, 10)} loading={loadingTrending} />
      <section className="relative z-[2] mx-auto mt-5 max-w-7xl space-y-7 pb-16 md:mt-10 xl:-mt-64">
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
