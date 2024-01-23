import "swiper/css";
import Link from "next/link";
import "swiper/css/effect-fade";
import { LongText } from "../read-more";
import { Movie } from "~/types/tmdb-type";
import { cn } from "@/lib/utils";
import { NextImage } from "../next-image";
import { imgUrl } from "~/constants/movie";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LoaderBlock } from "../loader/loader-block";

export const Banner: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    banner: Movie[] | undefined;
    loading?: boolean;
  }
> = ({ banner, loading, className, ...props }) => {
  if (loading) return <LoaderBlock className="h-[56.25vw] bg-ireng" />;
  return (
    <section className={cn("relative", className)} {...props}>
      <div className={cn("relative z-[1] h-[56.25vw]")}>
        <Swiper
          effect={"fade"}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          modules={[Autoplay, EffectFade]}
        >
          {banner?.map((bann) => (
            <SwiperSlide key={bann.id}>
              <div
                className={cn(
                  "relative aspect-video w-full bg-ireng object-cover brightness-50 sm:h-[56.25vw]",
                  loading ? "hidden" : "block",
                )}
              >
                <NextImage
                  src={`${imgUrl}/original${
                    bann?.backdrop_path || bann?.poster_path
                  }`}
                  alt={`banner ${bann?.title || bann?.name}`}
                  className="bg-ireng"
                  priority
                />
                <div className="absolute bottom-0 h-3/4 w-full bg-gradient-to-b from-transparent to-ireng" />
              </div>
              <div className="absolute top-[50%] z-20 ml-4 hidden min-w-[300px] flex-col gap-3 drop-shadow-lg xs:flex md:ml-16 xl:top-[20%]">
                <Link
                  className="w-fit"
                  href={
                    bann.release_date ? `/movie/${bann.id}` : `/tv/${bann.id}`
                  }
                >
                  <h1 className="text-2xl font-bold md:text-4xl xl:text-[2vw]">
                    {bann?.title || bann?.name || bann?.original_name}
                  </h1>
                </Link>
                <p className="text-shadow-md max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
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
};
