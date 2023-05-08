import Navbar from '@/components/navbar';
import Head from 'next/head';
import { Anime, Movie } from '../../typing';
import * as React from 'react';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Paginate } from '@/components/Paginate';
import { baseUrl } from '../../constants/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import RootLayout from '@/components/layouts/layout';
import { reqAuth } from '@/utils/reqAuth';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import LoaderBlock from '@/components/loader/loaderblock';

const AnimePage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(12);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const { data: airingNow, isLoading: isLoadingAiringNow } = useQuery<Movie[]>(
    ['airingNow'],
    () => axios.get('/api/anime/recentanime').then(response => response.data)
  );

  const { data: bannerAnime, isLoading: isLoadingBannerAnime } = useQuery<
    Movie[]
  >(['bannerAnime'], () =>
    axios
      .get('/api/anime/popularanime')
      .then(response => response.data.slice(0, 10))
  );

  const currentAiring = airingNow?.slice(firstPostIndex, lastPostIndex);

  const { data: session } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [router, session]);

  return (
    <RootLayout title="Anime">
      {session ? (
        <>
          <div className="main mx-3">
            <div className="flex flex-col justify-center xl:flex-row max-w-[1300px] mx-auto gap-5">
              <section className="flex flex-col pt-20">
                <div className="flex">
                  <div className="w-full relative lg:px-0 m-auto lg:w-[948px]">
                    {isLoadingBannerAnime ? (
                      <div className="w-full xl:w-[948px] aspect-video h-full rounded-sm bg-zinc-800 animate-pulse" />
                    ) : (
                      <Swiper
                        spaceBetween={30}
                        effect={'slide'}
                        loop={true}
                        autoplay={{
                          delay: 6500,
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
                        {bannerAnime?.slice(0, 5).map(tv => (
                          <SwiperSlide key={tv.id}>
                            <Link href={`/tv/${tv.id}`} id="swiperc">
                              <div className="relative w-full xl:w-[948px] aspect-video h-full">
                                <Image
                                  src={`${baseUrl}${
                                    tv?.backdrop_path || tv.poster_path
                                  }`}
                                  fill
                                  className="object-contain w-auto h-auto bg-[#121212] rounded-tr-md rounded-tl-md"
                                  alt="banner"
                                  priority
                                  draggable={false}
                                />
                                <div className="h-auto pb-2 bg-red-600/80 bottom-0 absolute w-full">
                                  <h1 className="flex text-base md:text-xl lg:text-2xl text-white justify-center items-center text-center font-semibold ">
                                    {tv.name || tv.title}
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
                    <h1 className="text-xl font-semibold mb-5 text-primary">
                      Recent Released
                    </h1>
                  </div>

                  {isLoadingAiringNow ? (
                    <div className="relative grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
                      {[...Array(12)].map((_, index) => (
                        <div
                          key={index}
                          className="relative w-full h-auto aspect-[9/14] bg-zinc-800 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="relative grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
                      {currentAiring?.map(tv => (
                        <Link
                          href={`/tv/${tv.id}`}
                          key={tv.original_name}
                          className="hover:brightness-75"
                        >
                          <div className="relative aspect-[9/14] w-auto h-auto">
                            <div className="absolute bottom-0 pb-1 z-[1] w-full bg-black/70">
                              <h2 className="flex text-sm text-gray-300 justify-center items-center text-center font-semibold">
                                {tv.name}
                              </h2>
                            </div>
                            <div className="relative w-full h-auto aspect-[9/14]">
                              <Image
                                src={`http://image.tmdb.org/t/p/w342/${tv.poster_path}`}
                                className="object-cover rounded"
                                fill
                                sizes="100%"
                                alt={`Thumbnail ${tv.name}`}
                                draggable={false}
                              />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {airingNow && (
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
                id="popular-tv-week"
                className="mt-20 bg-[#1C1C1C] p-2 rounded xl:mx-0 h-max"
              >
                <h1 className="text-xl font-semibold mb-2 text-primary">
                  Popular Anime Weekly
                </h1>
                {isLoadingBannerAnime ? (
                  <div className="flex">
                    <h2 className="w-5 m-3 h-5 p-5 rounded-md border flex justify-center items-center text-sm">
                      1
                    </h2>
                    <div className="relative w-[46px] h-[60px] aspect-[9:16] bg-zinc-800 animate-pulse" />
                    <div className="flex flex-col gap-2">
                      <span className="relative w-[180px] ml-3 h-4 rounded-sm aspect-[9:16] bg-zinc-800 animate-pulse"></span>
                      <span className="relative w-[150px] ml-3 h-4 rounded-sm aspect-[9:16] bg-zinc-800 animate-pulse"></span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {bannerAnime?.map((tv, index) => (
                      <Link
                        // href={tv.animeUrl.replace(/\/{2,}/g, '/')}
                        href={`/tv/${tv.id}`}
                        target="_blank"
                        key={tv.id}
                      >
                        {index === 0 ? (
                          <div className="relative w-full aspect-video h-full max-h-[180px] mb-3">
                            <div className="absolute h-auto max-h-[180px] w-full aspect-video z-0">
                              <Image
                                alt={tv.original_name}
                                className="rounded z-[-1] brightness-75 object-cover"
                                fill
                                src={`https://image.tmdb.org/t/p/w780/${tv.backdrop_path}`}
                                sizes="auto"
                              />
                              <div className="absolute flex bottom-0 justify-center items-center">
                                <h2 className="z-[2] w-5 m-3 h-5 p-5 rounded-md border flex bg-white/80 text-black justify-center items-center text-sm">{`${
                                  index + 1
                                }`}</h2>
                                <h3 className="z-[2] text-base text-white flex flex-wrap ">
                                  {tv.name}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative flex gap-3 mb-3">
                            <h2 className="w-5 m-3 h-5 p-5 rounded-md border flex justify-center items-center text-sm">{`${
                              index + 1
                            }`}</h2>
                            <div className="relative min-w-[46px] max-h-[60px] aspect-[9:16]">
                              <Image
                                alt={tv.original_name}
                                className="rounded w-12"
                                fill
                                src={`https://image.tmdb.org/t/p/w92/${tv.poster_path}`}
                                sizes="auto"
                              />
                            </div>
                            <h3 className="text-base text-gray-300 flex flex-wrap ">
                              {tv.name}
                            </h3>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
};

export default AnimePage;
