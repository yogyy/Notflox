import Banner from '@/components/netflix1/Banner';
import requests from '@/utils/request';
import RootLayout from '@/components/layouts/layout';
import {
  SwiperLanscape,
  SwiperPotrait,
} from '@/components/netflix1/SwiperToPage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LoaderBlock from '@/components/loader/loaderblock';
import { Movie } from '../../../typing';

interface Props {
  trendingNow: Movie[];
  topRated: Movie[];
  newRelease: Movie[];
}

const Movies = ({ trendingNow, topRated, newRelease }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [router, session]);

  return (
    <RootLayout title="Movies">
      {session ? (
        <>
          <div className="">
            <Banner banner={trendingNow.slice(0, 5)} />
          </div>
          <section className="space-y-7 mx-auto relative xl:-mt-64 max-w-[1300px] z-[2]">
            <SwiperLanscape
              className=""
              title="Trending Now"
              movies={trendingNow.slice(0, 10)}
            />
            <SwiperPotrait title="New Release" movies={newRelease} />
            <SwiperPotrait title="Top Rated" movies={topRated.slice(0, 10)} />
          </section>
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
};

export default Movies;

export const getStaticProps = async () => {
  const [trendingNow, topRated, newRelease] = await Promise.all([
    fetch(requests.fetchTrending).then(res => res.json()),
    fetch(requests.fetchTopRated).then(res => res.json()),
    fetch(requests.fetchNowPlaying).then(res => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      newRelease: newRelease.results,
    },
    revalidate: 3600,
  };
};
