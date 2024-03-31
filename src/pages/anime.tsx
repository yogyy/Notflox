import req from "@/utils/request";
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

const AnimePage = () => {
  const { data: bannerAnime, isLoading: isLoadingBannerAnime } = useCustomQuery(
    ["anime-popular"],
    `${baseUrl}/discover/tv?sort_by=popularity.desc&first_air_date.gte=${lastYear}&air_date.gte=${today}&with_genres=16&with_original_language=ja`,
  );
  return (
    <RootLayout
      title="Anime"
      description="Stay up-to-date with the latest anime releases. Explore new episodes, series, and exciting titles in the world of Japanese animation. Find release schedules, episode summaries, and streaming options for the hottest anime releases, all in one place"
    >
      <section className="mx-auto flex max-w-7xl flex-col gap-4 p-3 pb-5 sm:pt-16 xl:flex-row">
        <div className="mt-3 flex w-full flex-col gap-4">
          <div className="relative mx-auto w-full max-w-[948px]">
            <SwiperAnime
              loading={isLoadingBannerAnime}
              anime={bannerAnime?.slice(0, 10)}
              aria-label="swiper-anime"
            />
          </div>
          <AnimeAiring aria-label="airing-anime" />
        </div>
        <aside className="mx-auto h-max w-full max-w-[948px] rounded bg-[#1C1C1C] p-2 xl:mt-3 xl:w-[380px]">
          <h1 className="mb-2 text-xl font-semibold text-primary">
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
    </RootLayout>
  );
};

export default AnimePage;
