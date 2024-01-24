import { useAtom } from "jotai";
import req from "@/utils/request";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  SwiperLanscape,
  SwiperPotrait,
} from "@/components/layouts/swiper-show";
import { useCustomQuery } from "@/hooks/use-custom-query";
import { modalState } from "~/atoms/jotaiAtoms";
import { Banner } from "@/components/layouts/banner";
import RootLayout from "@/components/layouts/layout";

const LazyModalVideo = dynamic(
  () => import("@/components/layouts/modal-video"),
  { ssr: false },
);

const Notflox = () => {
  const [showModal, setShowModal] = useAtom(modalState);

  useEffect(() => {
    setShowModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: trendingNetflix, isLoading: loadingTrending } = useCustomQuery(
    ["netflix-trending"],
    req.TrendingNetflix,
  );
  const { data: topRatedNetflix, isLoading: loadingToprated } = useCustomQuery(
    ["netflix-top-rated"],
    req.TopRatedNetflix,
  );
  const { data: airToday, isLoading: loadingAirtdy } = useCustomQuery(
    ["air-today-netflix"],
    req.NetflixAirToday,
  );
  const { data: popularNetflix, isLoading: loadingPopular } = useCustomQuery(
    ["popular-netflix"],
    req.PopularNetflix,
  );

  return (
    <RootLayout title="Home">
      <Banner
        loading={
          loadingTrending || loadingToprated || loadingAirtdy || loadingPopular
        }
        banner={trendingNetflix?.slice(0, 5)}
      />
      <section className="relative z-[2] mx-auto mt-5 max-w-7xl space-y-7 pb-16 md:mt-10 xl:-mt-64">
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
      {showModal && <LazyModalVideo showDetail={true} />}
    </RootLayout>
  );
};

export default Notflox;
