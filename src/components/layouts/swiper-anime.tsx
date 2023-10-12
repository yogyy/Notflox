import 'swiper/css';
import React from 'react';
import Link from 'next/link';
import 'swiper/css/effect-fade';
import { Movie } from '~/typing';
import NextImage from '../next-image';
import { imgUrl } from '~/constants/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper';

const SwiperAnime = ({
  bannerAnime,
  loading,
}: {
  bannerAnime: Movie[] | undefined;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="w-full lg:w-[948px] aspect-video h-full rounded-sm bg-zinc-800 animate-pulse" />
    );
  }
  return (
    <Swiper
      effect={'fade'}
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
      className="w-full max-w-[948px]"
      modules={[Autoplay, Navigation, EffectFade]}>
      {bannerAnime?.slice(0, 10).map(tv => (
        <SwiperSlide key={tv.id}>
          <Link href={`/tv/${tv.id}`} aria-label={tv.name || tv.title}>
            <div className="relative w-full h-full aspect-video">
              <NextImage
                src={`${imgUrl}/w1280${tv?.backdrop_path || tv.poster_path}`}
                className="object-contain w-auto h-auto bg-ireng rounded-t-md"
                alt={`banner ${tv.name || tv.title}`}
                priority
              />
              <div className="absolute bottom-0 w-full h-auto pb-2 bg-red-600/80">
                <h1
                  id="similar-container"
                  className="flex items-center justify-center text-base font-semibold text-center text-white md:text-xl lg:text-2xl ">
                  {tv.name || tv.title}
                </h1>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperAnime;
