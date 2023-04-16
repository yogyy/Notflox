import Navbar from '@/components/navbar';
import { API_KEY, BASE_URL } from '@/utils/request';
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
import 'swiper/css/effect-fade';

interface Props {
  popularAnime: Anime[];
  airingNow: Anime[];
  bannerAnime: Movie[];
}

const AnimePage = ({ popularAnime, airingNow, bannerAnime }: Props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = airingNow.slice(firstPostIndex, lastPostIndex);
  const currentPop = popularAnime.slice(postPerPage);
  // const bannerAnim = bannerAnime.slice(firstPostIndex);
  const filteredMovies = bannerAnime.filter(movie => movie.overview !== '');

  return (
    <>
      <Head>
        <title>Anime - NOTFLOX </title>
      </Head>
      <Navbar />
      <main>
        <div className="main mx-3">
          <div className="flex flex-col justify-center xl:flex-row max-w-[1300px] mx-auto gap-5">
            <section className="flex flex-col pt-20 inset-0">
              {/* <div className="relative w-[255px] md:w-[564px] xl:w-[948px] m-auto"> */}
              <div className="flex">
                <div className="w-full relative px-2 lg:px-0 m-auto lg:w-[948px]">
                  <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    loop={true}
                    centeredSlides={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation, EffectFade]}
                    className="mySwiper"
                  >
                    {filteredMovies.map((anime, index) => (
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
                              sizes="(max-width: 768px) 100vw,
                              (max-width: 1200px) 50vw,
                              33vw"
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
                </div>
              </div>
              <div className="mx-auto">
                <div className="py-1 w-full">
                  <h1 className="text-xl font-semibold">Recent Released</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 w-max">
                  {airingNow.map(anime => (
                    <Link
                      href={anime.episodeUrl.replace(/\/{2,}/g, '/')}
                      target="_blank"
                      // href="#"
                      key={anime.animeTitle}
                      className="hover:brightness-75"
                      onClick={() => console.log(anime)}
                    >
                      <div className="relative aspect-[9/14] w-[120px] md:w-[180px] h-full">
                        <div className="absolute bottom-0 pb-1 z-[1] w-full bg-black/70">
                          <h2 className="flex text-sm text-gray-300 justify-center items-center text-center font-semibold">
                            {anime.animeTitle}
                          </h2>
                        </div>
                        <div className="absolute z-[1] bg-black">
                          <p>to</p>
                        </div>
                        <Image
                          src={anime.animeImg}
                          className="object-cover rounded"
                          fill
                          sizes="100%"
                          alt={`Thumbnail ${anime.animeTitle}`}
                          draggable={false}
                        />
                        {/* <span className="bg-gradient-to-t from-black to-transparent absolute h-full w-full bottom-0  rounded-sm"></span> */}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
            <section
              id="popular-anime-week"
              className="mt-20 bg-[#1C1C1C] p-2 rounded mx-3 xl:mx-0 h-max"
            >
              <h1 className="text-xl font-semibold mb-2">
                Popular Anime Weekly
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
                {popularAnime.map((anime, index) => (
                  <Link
                    href={anime.animeUrl.replace(/\/{2,}/g, '/')}
                    target="_blank"
                    key={anime.animeId}
                    className="relative flex gap-3 mb-3"
                  >
                    <h2 className="w-5 m-3 h-5 p-5 rounded-md border flex justify-center items-center text-sm">{`${
                      index + 1
                    }`}</h2>
                    <div className="relative min-w-[46px] max-h-[60px] aspect-[9:16]">
                      <Image
                        alt={anime.animeId}
                        className="rounded w-12"
                        fill
                        src={anime.animeImg}
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                      />
                    </div>
                    <h3 className="text-base text-gray-300 flex flex-wrap ">
                      {anime.animeTitle || anime.animeId}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <div className="h-20 flex items-center justify-center bg-[#1c1c1c] mt-3 rounded-sm">
            <p>Bottom text</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default AnimePage;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  const [popularAnime, airingNow, bannerAnime] = await Promise.all([
    fetch(`https://gogoanime.consumet.stream/top-airing`).then(res =>
      res.json()
    ),
    fetch(`https://gogoanime.consumet.stream/recent-release`).then(res =>
      res.json()
    ),
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&with_genres=16&page=1&with_original_language=ja`
    ).then(res => res.json()),
  ]);

  return {
    props: {
      popularAnime: popularAnime,
      airingNow: airingNow,
      bannerAnime: bannerAnime.results,
    },
  };
};
