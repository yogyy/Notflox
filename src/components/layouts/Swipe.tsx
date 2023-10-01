import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie } from '~/typing';
import { ThumbnailToPage, ThumbnailTrailer } from './Thumbnail';
import { FreeMode } from 'swiper';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import SwiperLoading from '../loader/swiperloader';
import 'swiper/css';
import 'swiper/css/free-mode';

type SwiperType = 'to-page' | 'play';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  movies: Movie[] | undefined;
  loading: boolean;
  type: SwiperType;
}

export function SwiperPotrait({
  title,
  movies,
  className,
  loading,
  type,
}: Partial<Props>) {
  if (loading) return <SwiperLoading variant="portrait" />;

  return (
    <div className={cn('relative h-auto space-y-0.5', className)}>
      <h2 className="ml-5 text-sm font-semibold transition duration-200 w-fit md:text-2xl">
        {title}
      </h2>
      <Swiper
        freeMode={true}
        modules={[FreeMode]}
        slidesPerView={1.5}
        spaceBetween={0}
        breakpoints={{
          220: {
            slidesPerView: 2.4,
          },
          320: {
            slidesPerView: 3,
          },
          420: {
            slidesPerView: 3.5,
          },
          640: {
            slidesPerView: 4.5,
          },
          768: {
            slidesPerView: 5.8,
          },
          1024: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 7.3,
          },
        }}>
        {movies?.map(movie => (
          <SwiperSlide
            className="px-1.5 py-5 moviecard first:hover:scale-110 first:hover:translate-x-2"
            key={movie.id}>
            {type === 'play' ? (
              <ThumbnailTrailer variant="portrait" movie={movie} />
            ) : (
              <ThumbnailToPage variant="portrait" movie={movie} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function SwiperLanscape({
  title,
  movies,
  className,
  loading,
  type,
}: Partial<Props>) {
  if (loading) return <SwiperLoading variant="landscape" />;

  return (
    <div className={cn('h-auto relative', className)}>
      <h2 className="ml-5 text-sm font-semibold w-fit md:text-2xl">{title}</h2>
      <Swiper
        slidesPerView={1.3}
        spaceBetween={4}
        freeMode={true}
        modules={[FreeMode]}
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
        }}>
        {movies?.map(movie => (
          <SwiperSlide
            className="px-1.5 first:hover:px-2 py-5 moviecard first:hover:scale-110 first:hover:translate-x-3"
            key={movie.id}>
            {type === 'play' ? (
              <ThumbnailTrailer variant="landscape" movie={movie} />
            ) : (
              <ThumbnailToPage variant="landscape" movie={movie} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
