import { API_KEY } from '@/utils/request';
import axios from 'axios';
import { Genre, Movie, Network, ProductionCompany } from '../../../typing';
import * as React from 'react';
import RootLayout from '@/components/layouts/layout';
import Image from 'next/image';
import { baseUrl } from '../../../constants/movie';
import Recomend from '@/components/netflix1/recomend';
import { tanggal } from '@/lib/getDate';
import { Paginate } from '@/components/Paginate';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import router from 'next/router';
import { useSession } from 'next-auth/react';
import LoaderBlock from '@/components/loader/loaderblock';

interface TvProps {
  tv: Movie;
  networks: Network[];
  genres: Genre[];
  productions: ProductionCompany[];
}
interface KW {
  id: number;
  name: string;
}

export default function TvDetails({ tv, productions, genres }: TvProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setpostPerPage] = React.useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const { data: session } = useSession();

  const { data: similarTVShows, isLoading: isLoadingsimilarTVShows } = useQuery(
    ['similarTv', tv.id],
    () => axios.get(`/api/tv/recommend/${tv.id}`).then(res => res.data.results),
    {
      cacheTime: 60 * 3000,
      staleTime: 60 * 2000,
    }
  );

  const { data: dataKeywords, isLoading: isLoadingKeywords } = useQuery(
    ['keywordsTv', tv.id],
    () => axios.get(`/api/tv/keyword/${tv.id}`).then(res => res.data.results),
    {
      cacheTime: 60 * 3000,
      staleTime: 60 * 2000,
    }
  );
  const similarPaginate = similarTVShows?.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }
  }, [session]);

  return (
    <RootLayout title={tv?.name!}>
      {session ? (
        <>
          <div className="relative w-screen h-[56.25vw] object-cover brightness-50 xl:w-screen">
            <span className="absolute top-[14%] left-[20%] text-3xl font-mono z-10">
              {tv?.tagline}
            </span>
            {tv?.backdrop_path !== null ? (
              <Image
                src={`${baseUrl}${tv?.backdrop_path || ''}`}
                fill
                alt={`banner ${tv?.name}`}
                priority
                draggable={false}
              />
            ) : (
              <div className="bg-[#121212]"></div>
            )}
            <div className="absolute bg-gradient-to-b from-transparent h-full to-[#5f5f5f] bottom-0 w-full" />
          </div>
          <div className="relative bg-gradient-to-b from-[#5f5f5f] to-[#121212] lg:bg-none mx-auto md:justify-center items-center md:items-start lg:-mt-[40%] flex gap-5 flex-col md:flex-row px-5 pt-4 max-w-[1200px]">
            <div className="h-full gap-3 md:flex md:flex-col relative">
              <div className="relative w-[164px] h-[255px] -mt-32 md:mt-0 rounded ">
                <Image
                  src={`https://image.tmdb.org/t/p/w342/${tv?.poster_path}`}
                  className="rounded-sm object-cover md:rounded flex"
                  width={165}
                  height={255}
                  alt={`Thumbnail ${tv?.name}`}
                  draggable={false}
                />
              </div>
              <div className="homepage">
                <h3 className="text-sm text-red-500 hover:text-red-600">
                  <Link target="_blank" href="/">
                    Homepage
                  </Link>
                </h3>
              </div>
            </div>
            <div className="md:w-7/12 w-full">
              <h1 className="text-xl font-semibold text-red-600">
                {tv?.name}{' '}
                <span className="text-gray-300">
                  ({tv?.first_air_date?.slice(0, 4)})
                </span>
              </h1>
              <h2 className="text- text-gray-300">{tv?.original_name}</h2>
              <p className="text-sm lg:text-base text-gray-400">
                {tv?.overview}
              </p>
              <hr className="my-2 border-zinc-800" />
              <div className="text-sm text-gray-300">
                <p>
                  Aired : {tanggal(tv?.first_air_date)}
                  &nbsp; to {tanggal(tv?.last_air_date || '?')}
                </p>
                <p>Status : {tv?.status}</p>
                <div className="text-gray-300">
                  <p>
                    Genre :&nbsp;
                    <span className="text-red-300">
                      {tv?.genres.map((genre: Genre) => genre.name).join(', ')}
                    </span>
                  </p>
                </div>
                <p className="text-gray-300">
                  <span className="">Rating :&nbsp;</span>
                  {tv?.vote_average.toFixed(1)} / 10 from&nbsp;
                  {tv?.vote_count.toLocaleString()}
                </p>
                <div className="text-sm text-gray-300">
                  <p>
                    Studio :{' '}
                    {tv?.production_companies
                      .map((studio: ProductionCompany) => studio.name)
                      .join(', ')}
                  </p>
                </div>
              </div>
              <hr className="mt-2 mb-12 border-zinc-800" />
            </div>
          </div>
          <div className="space-y-12 md:space-y-10 mx-auto relative max-w-[1300px]">
            {isLoadingKeywords ? (
              <div className="flex flex-wrap py-2 mt-5 xl:mb-52 items-center gap-2 mx-3">
                <h1 id="similar-tv-container" className="px-3">
                  Tags :
                </h1>
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-5 bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap py-2 mt-5 xl:mb-52 items-center">
                <h1 id="similar-tv-container" className="px-3">
                  Tags :
                </h1>
                {dataKeywords?.map((keyword: KW) => (
                  <p
                    key={keyword.id}
                    className="bg-white/5 text-gray-300 w-max px-2 rounded-md m-1 cursor-default hover:bg-white/10 hover:text-gray-200"
                  >
                    {keyword.name}
                  </p>
                ))}
              </div>
            )}
            {similarTVShows?.length !== 0 ? (
              <>
                {isLoadingsimilarTVShows ? (
                  <div className="mt-1 flex-col mx-4 frounded-sm">
                    <p className="text-xl font-semibold text-[#fcfbfb]">
                      Recommendations
                    </p>
                    <div className="w-32 h-4 bg-[#1c1c1c] animate-pulse mb-3 mt-2"></div>
                    <div className="flex">
                      <div className="relative aspect-[9/14] h-[150px] md:h-[249px] w-24 md:w-40 bg-[#1c1c1c] rounded mr-3 animate-pulse"></div>
                      <div className="w-full">
                        <div className="w-full h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                        <div className="w-full h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                        <div className="w-5/6 h-4 bg-[#1c1c1c] animate-pulse mb-3"></div>
                      </div>
                    </div>
                  </div>
                ) : (
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
                      totalPost={similarTVShows?.length}
                    />
                  </div>
                )}
              </>
            ) : (
              <div>
                <h1 className="text-1xl">Recommendations not available</h1>
              </div>
            )}
          </div>
        </>
      ) : (
        <LoaderBlock />
      )}
    </RootLayout>
  );
}

export async function getServerSideProps({ params }: any) {
  const tvId = Number(params.tvId);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=${API_KEY}`
    );

    return {
      props: {
        tv: data,
        genres: data.genres,
        productions: data.production_companies,
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
