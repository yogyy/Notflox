import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie } from '../../../typing';
import { ThumbnailLanscape, ThumbnailPotrait } from './Thumbnail';
import clsx from 'clsx';
import { FreeMode } from 'swiper';

interface Props {
  title: string;
  movies: Movie[];
  className?: string;
}

export function SwiperPotrait({ title, movies }: Props) {
  return (
    <div className="relative h-auto space-y-0.5">
      <h2 className="ml-5 text-sm font-semibold transition duration-200 w-fit md:text-2xl">
        {title}
      </h2>
      <div className="relative group">
        <div className="flex items-center">
          <Swiper
            freeMode={true}
            modules={[FreeMode]}
            slidesPerView={1.5}
            spaceBetween={4}
            className="containermoviecard"
            breakpoints={{
              220: {
                slidesPerView: 2.4,
              },
              320: {
                slidesPerView: 3,
              },
              420: {
                slidesPerView: 4,
              },
              520: {
                slidesPerView: 5,
              },
              620: {
                slidesPerView: 6,
              },
              768: {
                slidesPerView: 4.6,
              },
              920: {
                slidesPerView: 5.4,
              },
              1034: {
                slidesPerView: 6,
              },
              1300: {
                slidesPerView: 7.3,
              },
            }}
          >
            {movies?.map(movie => (
              <SwiperSlide className="p-2 py-5 moviecard" key={movie.id}>
                <ThumbnailPotrait key={movie.id} movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export function SwiperLanscape({ title, movies, className }: Props) {
  return (
    <div className={clsx('h-auto relative ', className)}>
      <h2 className="ml-5 text-sm font-semibold w-fit md:text-2xl">{title}</h2>
      <div className="relative group">
        <div className="flex items-center w-full">
          <Swiper
            slidesPerView={1.3}
            spaceBetween={4}
            freeMode={true}
            modules={[FreeMode]}
            className="containermoviecard"
            keyboard={true}
            breakpoints={{
              400: {
                slidesPerView: 1.7,
              },
              550: {
                slidesPerView: 2,
              },
              625: {
                slidesPerView: 2.7,
              },
              768: {
                slidesPerView: 2.5,
              },
              1200: {
                slidesPerView: 3.15,
              },
            }}
          >
            {movies?.map(movie => (
              <SwiperSlide className="px-2 py-6 moviecard" key={movie.id}>
                <ThumbnailLanscape movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
