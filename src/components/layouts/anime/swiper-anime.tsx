import "swiper/css";
import React from "react";
import Link from "next/link";
import "swiper/css/effect-fade";
import { NextImage } from "@/components/next-image";
import { imgUrl } from "~/constants/movie";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper";
import { Movie } from "~/types/tmdb-type";
import { cn } from "@/lib/utils";

interface SwiperAnimeProps extends SwiperProps {
  anime: Movie[] | undefined;
}

export const SwiperAnime = ({
  anime,
  className,
  ...props
}: SwiperAnimeProps) => {
  return (
    <Swiper
      effect={"fade"}
      loop={true}
      autoplay={{ delay: 6500, disableOnInteraction: false }}
      centeredSlides={true}
      className={cn("w-full max-w-[948px]", className)}
      modules={[Autoplay, Navigation, EffectFade]}
      {...props}
    >
      {anime?.map((tv) => (
        <SwiperSlide key={tv.id}>
          <Link href={`/tv/${tv.id}`} aria-label={tv.name || tv.title}>
            <div className="relative aspect-video h-full w-full">
              <NextImage
                src={`${imgUrl}/w1280${tv?.backdrop_path || tv.poster_path}`}
                className="h-auto w-auto rounded-t-md bg-ireng object-contain"
                alt={`banner ${tv.name || tv.title}`}
                priority
              />
              <div className="absolute bottom-0 h-auto w-full bg-red-600/80 pb-2">
                <h1 className="flex items-center justify-center text-center text-base font-semibold tracking-wide text-white/90 md:text-xl lg:text-2xl ">
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
