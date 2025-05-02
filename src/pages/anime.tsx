import { useCustomQuery } from "@/hooks/use-custom-query";
import RootLayout from "@/components/layouts/layout";
import { AnimeWeeklyLoading } from "@/components/loader/anime-loader";
import {
  AnimeAiring,
  AnimeWeekly,
  SwiperAnime,
} from "@/components/layouts/anime";
import { baseUrl } from "~/constants/movie";
import { lastYear, today } from "@/lib/get-date";
import { ReactElement } from "react";

const AnimePage = () => {
  const { data: bannerAnime, isLoading: isLoadingBannerAnime } = useCustomQuery(
    ["anime-popular"],
    `${baseUrl}/discover/tv?sort_by=popularity.desc&first_air_date.gte=${lastYear}&air_date.gte=${today}&with_genres=16&with_original_language=ja`,
  );
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 p-3 pb-5 sm:pt-16 xl:flex-row">
      <div className="mt-3 flex w-full flex-col gap-4">
        <div className="relative mx-auto w-full max-w-[948px]">
          {isLoadingBannerAnime ? (
            <div className="aspect-video h-full w-full animate-pulse rounded-sm bg-zinc-800 lg:w-[948px]" />
          ) : (
            <SwiperAnime
              anime={bannerAnime?.slice(0, 10)}
              aria-label="swiper-anime"
            />
          )}
        </div>
        <AnimeAiring aria-label="airing-anime" />
      </div>
      <aside className="mx-auto h-max w-full max-w-[948px] rounded bg-[#1C1C1C] p-2 xl:mt-3 xl:w-[380px]">
        <h1 className="mb-2 text-center text-xl font-semibold tracking-wide text-primary">
          More Popular Anime Weekly
        </h1>
        {isLoadingBannerAnime ? (
          <AnimeWeeklyLoading />
        ) : (
          <AnimeWeekly
            anime={bannerAnime?.slice(10, 20)}
            aria-label="weekly-anime"
          />
        )}
      </aside>
    </section>
  );
};

AnimePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout
      title="Anime"
      description="Discover the latest anime releases and updates."
    >
      {page}
    </RootLayout>
  );
};

export default AnimePage;
