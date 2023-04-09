import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie, Network } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import { ProductionCompany } from '../../../typing';
import { Tooltip } from '@mui/material';
import Recomend from '@/components/netflix1/recomend';
import { tanggal } from '@/lib/getDate';

interface Props {
  movie: Movie;
  production_companies: ProductionCompany[];
  genres: Genre[];
}

interface KW {
  id: number;
  name: string;
}

export default function MovieDetails({
  movie,
  production_companies,
  genres,
}: Props) {
  const [similarTVShows, setSimilarTVShows] = React.useState([]);
  const [filteredTVShows, setFilteredTVShows] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);

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
  }, [movie.id]);

  React.useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/keywords?api_key=${API_KEY}`
      )
      .then(response => {
        setKeywords(response.data.keywords);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movie.id]);

  return (
    <RootLayout title={movie.title}>
      <div className="relative w-screen h-[56.25vw] object-cover brightness-50 xl:w-screen">
        <span className="absolute top-[14%] left-[20%] text-3xl font-mono z-10">
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
        <div className="h-max gap-3 md:flex md:flex-col">
          <div className="relative aspect-[9/14] w-[164px] h-auto bg-zinc-900 rounded flex">
            <Image
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              className="rounded-sm object-cover md:rounded flex"
              fill
              sizes="100%"
              alt={`Thumbnail ${movie?.name}`}
              draggable={false}
            />
          </div>
          <span className="h-"></span>
        </div>
        <div className="md:w-7/12 w-full">
          <h1 className="text-xl font-semibold">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <p>{tanggal(movie.release_date || movie.first_air_date)}</p>
          <div className="text-[gray]">
            {genres.map(genre => genre.name).join(', ')}
          </div>
          <hr className="my-2 border-zinc-800" />
          <p>
            <span className="text-base font-semibold">Rating</span> :
            {movie.vote_average.toFixed(1)} / 10 from
            {movie.vote_count.toLocaleString()}
          </p>
          <p className="text-gray-300">{movie.overview}</p>
          <hr className="my-2 border-zinc-800" />
          <div className="ml-2 grid grid-cols-3 items-center">
            {production_companies.map(network => (
              <div
                key={network.id}
                className="flex justify-center m-2"
              >
                <Tooltip title={network.name} disableFocusListener>
                  {network.logo_path ? (
                    <Image
                      width={50 || 'auto'}
                      height={50 || 'auto'}
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                      alt={network.name}
                    />
                  ) : (
                    <p className="text-sm">{network.name}</p>
                  )}
                </Tooltip>
              </div>
            ))}
          </div>
          <hr className="mt-2 mb-12 border-zinc-800" />
        </div>
      </div>
      <div id="similar-tv-container">
        {/* {similarTVShows.map((tv: Movie) => (
          <div key={tv.id}>
            <ThumbnailPotrait movie={tv} />
          </div>
        ))} */}
        <div className="space-y-12 md:space-y-10 mx-auto relative max-w-[1300px]">
          <div className="flex flex-wrap py-2 mt-10 xl:mb-52 items-center">
            <h1 className="px-1">Tags :</h1>
            {keywords.map((keyword: KW) => (
              <p
                key={keyword.id}
                className="bg-white/5 text-gray-300 w-max px-1 rounded-md m-1 "
              >
                {keyword.name}
              </p>
            ))}
          </div>
          <Recomend
            className=""
            title="Recommendations"
            movies={filteredTVShows}
          />
        </div>
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
