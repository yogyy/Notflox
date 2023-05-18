import { PlayIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import * as React from 'react';
import { baseUrl } from '../../../constants/movie';
import { Movie } from '../../../typing';
import LongText from './ReadMore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import Link from 'next/link';

interface Props {
  banner: Movie[] | undefined;
}

const getRandomMovie = (movies: string | any[]) => {
  return movies[Math.floor(Math.random() * movies.length)];
};

export default function Banner({ banner }: Props) {
  return (
    <div className="relative h-full">
      <div className="relative h-[56.25vw] z-[1]">
        <Swiper
          effect={'fade'}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
        >
          {banner?.map((anime, index) => (
            <SwiperSlide key={anime.id}>
              <div className="relative w-screen h-[56.25vw] bg-[#121212] object-cover brightness-50">
                <Image
                  src={`${baseUrl}${
                    anime?.backdrop_path || anime?.poster_path
                  }`}
                  fill
                  alt="banner"
                  className="bg-[#121212]"
                  priority
                  draggable={false}
                />
                <div className="absolute bg-gradient-to-b from-transparent h-3/4 to-[#121212] bottom-0 w-full" />
              </div>
              <div className="absolute top-[50%] xl:top-[20%] ml-4 md:ml-16 flex flex-col gap-3 min-w-[300px] drop-shadow-lg">
                <h1 className="text-2xl font-bold md:text-4xl xl:text-7xl">
                  {anime?.title || anime?.name || anime?.original_name}
                </h1>
                <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                  <LongText
                    href={
                      anime.media_type === 'tv'
                        ? `/tv/${anime.id}`
                        : `/movie/${anime.id}`
                    }
                    text={anime?.overview}
                    maxLength={120}
                  />
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <span className="m-10" />
    </div>
  );
}
