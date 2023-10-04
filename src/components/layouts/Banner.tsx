import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LongText from './ReadMore';
import { baseUrl } from '~/constants/movie';
import { Movie } from '~/typing';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/effect-fade';
import LoaderBlock from '../loader/loaderblock';

interface Props {
  banner: Movie[] | undefined;
  loading?: boolean;
}

export default function Banner({ banner, loading }: Props) {
  if (loading) return <LoaderBlock className="h-[56.25vw] bg-ireng" />;
  return (
    <section className="relative">
      <div className={cn('relative h-[56.25vw] z-[1]')}>
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
          className="mySwiper">
          {banner?.map(bann => (
            <SwiperSlide key={bann.id}>
              <div
                className={cn(
                  'relative w-full sm:h-[56.25vw] object-cover aspect-video bg-ireng brightness-50',
                  loading ? 'hidden' : 'block'
                )}>
                <Image
                  src={`${baseUrl}${bann?.backdrop_path || bann?.poster_path}`}
                  fill
                  alt="banner"
                  className="bg-ireng"
                  priority
                  draggable={false}
                />
                <div className="absolute bg-gradient-to-b from-transparent h-3/4 to-ireng bottom-0 w-full" />
              </div>
              <div className="hidden absolute top-[50%] xl:top-[20%] ml-4 md:ml-16 xs:flex flex-col gap-3 min-w-[300px] drop-shadow-lg z-10">
                <Link
                  className="w-fit"
                  href={
                    bann.release_date ? `/movie/${bann.id}` : `/tv/${bann.id}`
                  }>
                  <h1 className="text-2xl font-bold md:text-4xl xl:text-[2vw]">
                    {bann?.title || bann?.name || bann?.original_name}
                  </h1>
                </Link>
                <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                  <LongText
                    href={
                      bann.release_date ? `/movie/${bann.id}` : `/tv/${bann.id}`
                    }
                    text={bann?.overview}
                    maxLength={120}
                  />
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
