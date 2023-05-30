import Banner from '@/components/netflix1/Banner';
import requests from '@/utils/request';
import { useSession } from 'next-auth/react';
import RootLayout from '@/components/layouts/layout';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/netflix1/SwiperToPage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoaderBlock from '@/components/loader/loaderblock';
import { Movie } from '../../../typing';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  fetchNowPlaying: Movie[];
}

const Tv = ({ topRated, trendingNow, fetchNowPlaying }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [router, session]);

  return (
    <RootLayout title={'TV Show'}>
      {session ? (
        <>
          <Banner banner={trendingNow.slice(0, 5)} />
          <section className="space-y-7 mx-auto relative xl:-mt-64 max-w-[1300px] z-[2]">
            <SwiperLanscape
              title="Tv Show Trending"
              movies={trendingNow.slice(0, 10)}
            />
            <SwiperPotrait title="Now Playing" movies={fetchNowPlaying} />
            <SwiperPotrait
              title="Top Rated Tv"
              movies={topRated.slice(0, 10)}
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

export const getStaticProps = async () => {
  const [trendingNow, topRated, fetchNowPlaying] = await Promise.all([
    fetch(requests.fetchTrendingTv).then(res => res.json()),
    fetch(requests.fetchTopRatedTv).then(res => res.json()),
    fetch(requests.fetchNowPlayingTv).then(res => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      fetchNowPlaying: fetchNowPlaying.results,
    },
    revalidate: 3600,
  };
};
