import req from '@/utils/request';
import dynamic from 'next/dynamic';
import useAnime from '@/hooks/useCustomQuery';
import RootLayout from '@/components/layouts/layout';
import SwiperAnime from '@/components/layouts/swiper-anime';
import AnimeWeekly from '@/components/layouts/anime-weekly';
import AnimeWeeklyLoading from '@/components/loader/anime-weekly-loading';
import AnimeAiringLoading from '@/components/loader/anime-airing-loading';

const LazyAnimeAiring = dynamic(
  () => import('@/components/layouts/anime-airing'),
  {
    ssr: false,
    loading: () => <AnimeAiringLoading />,
  }
);

const AnimePage = () => {
  const { data: bannerAnime, isLoading: isLoadingBannerAnime } = useAnime(
    ['anime-popular'],
    req.PopularAnime
  );

  return (
    <RootLayout
      title="Anime"
      description="Stay up-to-date with the latest anime releases. Explore new episodes, series, and exciting titles in the world of Japanese animation. Find release schedules, episode summaries, and streaming options for the hottest anime releases, all in one place">
      <div className="p-3 pb-5">
        <div className="flex flex-col gap-4 mx-auto xl:flex-row max-w-7xl sm:pt-16">
          <section className="flex flex-col w-full gap-4">
            <div className="flex">
              <div className="w-full relative lg:px-0 mx-auto max-w-[948px]">
                <SwiperAnime
                  loading={isLoadingBannerAnime}
                  bannerAnime={bannerAnime}
                />
              </div>
            </div>
            <LazyAnimeAiring />
          </section>
          <section
            id="popular-tv-week"
            className="bg-[#1C1C1C] max-w-[948px] mx-auto p-2 rounded xl:w-[380px] h-max w-full">
            <h1 className="mb-2 text-xl font-semibold text-primary">
              More Popular Anime Weekly
            </h1>
            {isLoadingBannerAnime ? (
              <AnimeWeeklyLoading />
            ) : (
              <AnimeWeekly bannerAnime={bannerAnime?.slice(10, 20)} />
            )}
          </section>
        </div>
      </div>
    </RootLayout>
  );
};

export default AnimePage;
