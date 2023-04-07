import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie, Network } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Banner from '@/components/netflix1/Banner';
import { ThumbnailPotrait } from '@/components/netflix1/Thumbnail';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import { ProductionCompany } from '../../../typing';
import { Tooltip } from '@mui/material';
import { RowPotrait } from '@/components/netflix1/Row';

interface Props {
  movie: Movie;
  production_companies: ProductionCompany[];
}

export default function MovieDetails({ movie, production_companies }: Props) {
  const [companys, setCompanys] = React.useState<ProductionCompany[]>([]);
  const [genres, setGenres] = React.useState<Genre[]>([]);
  // const [networks, setNetworks] = React.useState<Network[]>([]);
  const [similarTVShows, setSimilarTVShows] = React.useState([]);
  const [filteredTVShows, setFilteredTVShows] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1&_limit=1`
    )
      .then(response => response.json())
      .then(data => {
        setSimilarTVShows(data.results);
        setFilteredTVShows(
          data.results.filter((tv: Movie) => tv.poster_path !== null)
        );
      })
      .catch(error => console.error('Error fetching similar TV shows:', error));
    console.log(filteredTVShows);
  }, [movie.id]);

  return (
    <RootLayout title={movie.title || movie.name}>
      <div className="relative w-screen h-[56.25vw] object-cover brightness-50 xl:w-screen">
        <span className="absolute top-[14%] left-[20%] text-3xl font-mono z-10 text-black">
          {movie.tagline}
        </span>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          className="bg-black/25"
          fill
          alt="banner"
          priority
          draggable={false}
        />
        <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
      </div>
      <div className="relative mx-auto md:justify-center lg:-mt-[40%] flex gap-5 flex-col md:flex-row px-5 items-center pt-4 bg-white/20 lg:bg-transparent">
        <div className="relative aspect-[9/14] w-[164px] h-full bg-slate-800 rounded">
          <Image
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            className="rounded-sm object-cover md:rounded"
            fill
            sizes="100%"
            alt={`Thumbnail ${movie?.name}`}
            draggable={false}
            onClick={() => console.log(movie)}
          />
        </div>
        <div className="md:w-7/12 w-full">
          <h1 className="text-xl font-semibold">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <div className="text-[gray]">
            {genres.map(genre => genre.name).join(', ')}
          </div>
          <hr className="my-2 border-zinc-800" />
          <p>
            <span className="text-base font-semibold">Rating</span>:{' '}
            {movie.vote_average.toFixed(1)} /10 from{' '}
            {movie.vote_count.toLocaleString()}
          </p>
          <p>{movie.overview}</p>
          <hr className="my-2 border-zinc-800" />
          <div className="ml-2 grid grid-rows-2 grid-cols-3 items-center">
            {production_companies.map(network => (
              <span
                key={network.id}
                className="flex justify-center m-2"
                onClick={() => console.log(network)}
              >
                <Tooltip title={network.name}>
                  {network.logo_path ? (
                    <Image
                      width={50}
                      height={110}
                      style={{ width: 'auto', height: 'auto' }}
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                      alt={network.name}
                    />
                  ) : (
                    <p className="text-sm">{network.name}</p>
                  )}
                </Tooltip>
              </span>
            ))}
          </div>
          <hr className="mt-2 mb-12 border-zinc-800" />
        </div>
      </div>
      <div
        id="similar-tv-container"
        className="lg:mt-52 items-center flex justify-center relative"
      >
        {/* {similarTVShows.map((tv: Movie) => (
          <div key={tv.id}>
            <ThumbnailPotrait movie={tv} />
          </div>
        ))} */}
        <section className="px-5 relative items-center w-[1300px]">
          {/* <RowPotrait title="Similar" movies={filteredTVShows} /> */}
        </section>
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps({ params }: any) {
  const { movieId } = params;

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  return {
    props: {
      movie: data,
      production_companies: data.production_companies,
      genres: data.genres,
    },
  };
}
