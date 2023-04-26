import Navbar from '@/components/navbar';
import Head from 'next/head';
import { Anime, Movie } from '../../typing';
import * as React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Paginate } from '@/components/Paginate';
import { baseUrl } from '../../constants/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper';

import 'swiper/css';
import { Skeleton } from '@mui/material';
import { NextResponse } from 'next/server';
import RootLayout from '@/components/layouts/layout';

// export const revalidate = 60;

const AnimePage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(12);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const [airingNow, setAiringNow] = React.useState<Movie[]>([]);
  const [bannerAnime, setBannerAnime] = React.useState<Movie[]>([]);
  const [doneFetch, setDoneFetch] = React.useState(false);

  const currentAiring = airingNow.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [animeBaru, animeRame] = await Promise.all([
          axios.get('/api/anime/recentanime'),
          axios.get('/api/anime/popularanime'),
        ]);
        setAiringNow(animeBaru.data);
        setBannerAnime(animeRame.data);
        setDoneFetch(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <RootLayout title="Anime">
      <>
        <div className="main mx-3">
          <div className="flex flex-col justify-center xl:flex-row max-w-[1300px] mx-auto gap-5">
            <section className="flex flex-col pt-20">
              {/* <div className="relative w-[255px] md:w-[564px] xl:w-[948px] m-auto"> */}

              <div className="flex">
                <div className="w-full relative px-2 lg:px-0 m-auto lg:w-[948px]">
                  {!doneFetch ? (
                    <Skeleton
                      sx={{ bgcolor: 'grey.900' }}
                      variant="rectangular"
                      className="w-full lg:w-[948px] aspect-video h-full"
                    />
                  ) : (
                    <Swiper
                      spaceBetween={30}
                      effect={'slide'}
                      loop={true}
                      autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                      }}
                      centeredSlides={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Autoplay, Navigation, EffectFade]}
                      className="mySwiper"
                    >
                      {bannerAnime.slice(0, 5).map((anime, index) => (
                        <SwiperSlide key={anime.id}>
                          <Link
                            href={`/tv/${anime.id}`}
                            // href="#swiperc"
                            // target="_blank"
                            id="swiperc"
                          >
                            <div className="relative w-full xl:w-[948px] aspect-video h-full">
                              <Image
                                src={`${baseUrl}${
                                  anime?.backdrop_path || anime.poster_path
                                }`}
                                fill
                                className="object-contain w-auto h-auto bg-[#121212] rounded-tr-md rounded-tl-md"
                                alt="banner"
                                priority
                                draggable={false}
                              />
                              <div className="h-auto pb-2 bg-red-600/80 bottom-0 absolute w-full">
                                <h1 className="flex text-base md:text-xl lg:text-2xl text-white justify-center items-center text-center font-semibold ">
                                  {anime.name || anime.title}
                                </h1>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>
              <span id="similar-tv-container" className="mb-5"></span>
              <div className="mt-16 w-full lg:w-[948px] mx-auto">
                <div className="py-1 w-full">
                  <h1 className="text-xl font-semibold mb-5">
                    Recent Released
                  </h1>
                </div>

                {!doneFetch ? (
                  <div className="relative grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
                    {(() => {
                      const skeletons = [];

                      for (let i = 0; i < 12; i++) {
                        skeletons.push(
                          <Skeleton
                            key={i}
                            sx={{ bgcolor: 'grey.900' }}
                            variant="rectangular"
                            className="aspect-[9/14] w-auto h-auto"
                          />
                        );
                      }

                      return skeletons;
                    })()}
                  </div>
                ) : (
                  <div className="relative grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
                    {currentAiring.map(anime => (
                      <Link
                        href={`/tv/${anime.id}`}
                        // target="_blank"
                        key={anime.original_name}
                        className="hover:brightness-75"
                      >
                        <div className="relative aspect-[9/14] w-auto h-auto">
                          <div className="absolute bottom-0 pb-1 z-[1] w-full bg-black/70">
                            <h2 className="flex text-sm text-gray-300 justify-center items-center text-center font-semibold">
                              {anime.name}
                            </h2>
                          </div>
                          {/* <div className="absolute z-[1] bg-black/70 rounded-br px-1 py-0.5">
                            <p>Episode {anime.}</p>
                          </div> */}
                          <div className="relative w-full h-auto aspect-[9/14]">
                            <Image
                              src={`http://image.tmdb.org/t/p/w342/${anime.poster_path}`}
                              className="object-cover rounded"
                              fill
                              sizes="100%"
                              alt={`Thumbnail ${anime.name}`}
                              draggable={false}
                            />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {currentAiring && (
                  <Paginate
                    currentPage={currentPage}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    totalPost={airingNow.length}
                  />
                )}
              </div>
            </section>
            <section
              id="popular-anime-week"
              className="mt-20 bg-[#1C1C1C] p-2 rounded xl:mx-0 h-max"
            >
              <h1 className="text-xl font-semibold mb-2">
                Popular Anime Weekly
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
                {bannerAnime.slice(0, 10).map((anime, index) => (
                  <Link
                    // href={anime.animeUrl.replace(/\/{2,}/g, '/')}
                    href={`/tv/${anime.id}`}
                    target="_blank"
                    key={anime.id}
                    className="relative flex gap-3 mb-3"
                  >
                    <h2 className="w-5 m-3 h-5 p-5 rounded-md border flex justify-center items-center text-sm">{`${
                      index + 1
                    }`}</h2>
                    <div className="relative min-w-[46px] max-h-[60px] aspect-[9:16]">
                      <Image
                        alt={anime.original_name}
                        className="rounded w-12"
                        fill
                        src={`https://image.tmdb.org/t/p/w92/${anime.poster_path}`}
                        sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
                      />
                    </div>
                    <h3 className="text-base text-gray-300 flex flex-wrap ">
                      {anime.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <div className="h-20 flex items-center justify-center bg-[#1c1c1c] mt-3 rounded-sm">
            <p className="font-base text-xl">
              Made by&nbsp;
              <Link
                className="text-sky-500"
                href="https://www.github.com/yogyy"
                target="_blank"
              >
                Yogi
              </Link>
            </p>
          </div>
        </div>
      </>
    </RootLayout>
  );
};

export default AnimePage;

export const getServerSideProps = async (context: NextPageContext) => {
  context.res?.setHeader(
    'Cache-Control',
    'public, max-age=3600, stale-while-revalidate=1800'
  );
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
