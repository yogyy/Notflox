import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie, Network } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import { Tooltip } from '@mui/material';
import Recomend from '@/components/netflix1/recomend';
import { tanggal } from '@/lib/getDate';

interface Props {
  movie: Movie;
  networks: Network[];
  genres: Genre[];
}
interface KW {
  id: number;
  name: string;
}

export default function MovieDetails({ movie, networks, genres }: Props) {
  const [similarTVShows, setSimilarTVShows] = React.useState([]);
  const [filteredTVShows, setFilteredTVShows] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${movie.id}/recommendations?api_key=${API_KEY}&page=1`
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
        `https://api.themoviedb.org/3/tv/${movie.id}/keywords?api_key=${API_KEY}`
      )
      .then(response => {
        setKeywords(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movie.id]);

  return (
    <RootLayout title={movie.name}>
      <div className="relative w-screen h-[56.25vw] object-cover brightness-50 xl:w-screen">
        <span className="absolute top-[14%] left-[20%] text-3xl font-mono z-10">
          {movie.tagline}
        </span>
        {movie.backdrop_path !== null ? (
          <Image
            src={`${baseUrl}${movie?.backdrop_path || ''}`}
            fill
            alt={`banner ${movie.name}`}
            priority
            draggable={false}
          />
        ) : (
          <div className="bg-[#121212]"></div>
        )}
        <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
      </div>
      <div className="relative mx-auto md:justify-center items-center md:items-start lg:-mt-[40%] flex gap-5 flex-col md:flex-row px-5 mt-4 max-w-[1200px]">
        <div className="relative -mt-32 md:mt-0 rounded w-[164px]">
          <Image
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            className="rounded-sm md:rounded md:absolute"
            width={164}
            height={255}
            alt={`Thumbnail ${movie?.name}`}
            draggable={false}
            onClick={() => console.log(movie)}
          />
        </div>
        <div className=" w-full">
          <h1 className="text-2xl font-semibold">
            {movie.name} ({movie.first_air_date?.slice(0, 4)})
          </h1>
          <h2 className="text- text-gray-400">{movie?.original_name}</h2>
          <p>{tanggal(movie.release_date || movie.first_air_date)}</p>
          <div className="text-gray-400">
            {genres.map(genre => genre.name).join(', ')}
          </div>
          <hr className="my-2 border-zinc-800" />
          <p>
            <span className="text-base font-semibold">Rating </span> :&nbsp;
            {movie.vote_average.toFixed(1)} / 10 from&nbsp;
            {movie.vote_count.toLocaleString()}
          </p>
          <p>{movie.overview}</p>
          <hr className="my-2 border-zinc-800" />
          <div className="ml-2 grid grid-cols-3 items-center">
            {networks.map(network => (
              <div key={network.id} className="flex justify-around">
                <Tooltip title={network.name} disableFocusListener>
                  {network.logo_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="w-10 md:w-12 h-auto m-2"
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                      alt={`Thumnail ${network.name}`}
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

      <div className="space-y-12 md:space-y-10 mx-auto relative max-w-[1300px]">
        <div className="flex flex-wrap py-2 mt-5 xl:mb-52 items-center">
          <h1 className="px-3">Tags :</h1>
          {keywords.map((keyword: KW) => (
            <p
              key={keyword.id}
              className="bg-white/5 text-gray-300 w-max px-2 rounded-md m-1 cursor-default hover:bg-white/10 hover:text-gray-200"
            >
              {keyword.name}
            </p>
          ))}
        </div>
        {filteredTVShows && filteredTVShows.length > 0 ? (
          <Recomend
            className=""
            title="Recommendations"
            movies={filteredTVShows}
          />
        ) : (
          <p></p>
        )}
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps({ params }: any) {
  const { tvId } = params;

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}&language=en-US&append_to_response=networks`
  );

  return {
    props: {
      movie: data,
      networks: data.networks,
      genres: data.genres,
    },
  };
}
