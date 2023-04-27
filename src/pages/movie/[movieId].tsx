import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import { ProductionCompany } from '../../../typing';
import Recomend from '@/components/netflix1/recomend';
import { tanggal } from '@/lib/getDate';
import { Paginate } from '@/components/Paginate';
import Link from 'next/link';

interface Props {
  movie: Movie;
  productions: ProductionCompany[];
  genres: Genre[];
}

interface KW {
  id: number;
  name: string;
}

export default function MovieDetails({ movie, productions, genres }: Props) {
  const [similarTVShows, setSimilarTVShows] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const similarPaginate = similarTVShows.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    axios
      .get(`/api/movie/keyword/${movie.id}`)
      .then(response => {
        setKeywords(response.data.keywords);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movie.id]);

  React.useEffect(() => {
    axios
      .get(`/api/movie/recommend/${movie.id}`)
      .then(response => setSimilarTVShows(response.data.results))
      .catch(error => console.error('Error fetching similar TV shows:', error));
    setCurrentPage(1);
  }, [movie]);

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
      <div className="relative mx-auto md:justify-center lg:-mt-[40%] flex gap-5 flex-col md:flex-row px-5 items-center md:items-start pt-4 bg-white/20 lg:bg-transparent">
        <div className="h-full gap-3 md:flex md:flex-col relative">
          <div className="relative -mt-32 md:mt-0 rounded flex">
            <Image
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              className="rounded-sm object-cover md:rounded flex skeleton"
              width={164}
              height={255}
              style={{ width: 'auto' }}
              alt={`Thumbnail ${movie?.title}`}
              draggable={false}
            />
          </div>
          <div className="homepage flex justify-center">
            <h3 className="text-sm text-red-500 hover:text-red-600">
              <Link target="_blank" href={movie.homepage}>
                Homepage
              </Link>
            </h3>
          </div>
        </div>
        <div className="md:w-7/12 w-full">
          <h1 className="text-xl font-semibold text-red-600">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <h2 className="text- text-gray-400">{movie?.original_title}</h2>
          <p className="text-gray-300 text-sm lg:text-base">{movie.overview}</p>
          <hr className="my-2 border-zinc-800" />
          <div className="text-sm text-gray-300">
            <p>Aired : {tanggal(movie.release_date)}</p>
            <p>Status : {movie.status}</p>
            <div className="text-gray-300">
              <p>
                Genre :&nbsp;
                <span className="text-red-300">
                  {genres.map(genre => genre.name).join(', ')}
                </span>
              </p>
            </div>
            <p className="text-gray-300">
              <span className="">Rating :&nbsp;</span>
              {movie.vote_average.toFixed(1)} / 10 from&nbsp;
              {movie.vote_count.toLocaleString()}
            </p>
            <div className="text-sm text-gray-300">
              <p>
                Studio : {productions?.map(studio => studio.name).join(', ')}
              </p>
            </div>
          </div>
          <hr className="mt-2 mb-12 border-zinc-800" />
        </div>
      </div>
      <div>
        <div className="space-y-12 md:space-y-10 mx-auto relative max-w-[1300px]">
          <div className="relative flex flex-wrap py-2 mt-5 xl:mb-52 items-center">
            <h1 id="similar-tv-container" className="px-3">
              Tags :
            </h1>
            {keywords.map((keyword: KW) => (
              <p
                key={keyword.id}
                className="bg-white/5 text-gray-300 w-max px-2 rounded-md m-1 cursor-default hover:bg-white/10 hover:text-gray-200"
              >
                {keyword.name}
              </p>
            ))}
          </div>

          <div className="">
            <Recomend
              className=""
              title="Recommendations"
              movies={similarPaginate}
            />

            <Paginate
              currentPage={currentPage}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              totalPost={similarTVShows.length}
            />
            {/*  */}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const movieId = Number(params.movieId);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );

    return {
      props: {
        movie: data,
        productions: data.production_companies,
        genres: data.genres,
      },
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
}
