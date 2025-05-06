import { useCustomQuery } from "@/hooks/use-custom-query";
import RootLayout from "@/components/layouts/layout";
import { baseUrl } from "~/constants/movie";
import { today } from "@/lib/get-date";
import { ReactElement } from "react";
import { PopularAnime } from "@/components/layouts/anime/popular";
import { AiringAnime } from "@/components/layouts/anime/airing";
import { TopAnime } from "@/components/layouts/anime/top";

const AnimePage = () => {
  const { data: bannerAnime, isLoading: isLoadingBannerAnime } = useCustomQuery(
    ["anime-popular"],
    `${baseUrl}/discover/tv?air_date.gte=${today}&with_keywords=210024&with_original_language=ja|zh`,
  );

  return (
    <section className="relative mx-auto flex max-w-7xl flex-col gap-4 p-3 pb-16 sm:pt-16 xl:flex-row">
      <div className="mt-3 flex w-full flex-col gap-4">
        <div className="relative mx-auto w-full max-w-[948px]">
          {isLoadingBannerAnime ? (
            <div className="aspect-video h-full w-full animate-pulse rounded-sm bg-zinc-800 lg:w-[948px]" />
          ) : (
            <PopularAnime
              anime={bannerAnime?.slice(0, 10)}
              aria-label="Popular Anime"
            />
          )}
        </div>
        <AiringAnime aria-label="Airing Anime" />
      </div>
      <aside className="relative mx-auto w-full max-w-[948px] rounded bg-card p-2 xl:mt-3 xl:w-[380px]">
        <TopAnime aria-label="Top Leaderboards Anime" />
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
